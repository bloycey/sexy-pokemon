const EloRating = require("elo-rating");
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = process.env.DB_URI;
const pokemon = require("../../src/data/pokemon.json");

let cachedDb = null;

const connectToDatabase = async (uri) => {
  if (cachedDb && cachedDb.serverConfig.isConnected()) return cachedDb;

  const client = await MongoClient.connect(uri, {
	useUnifiedTopology: true,
	maxIdleTimeMS: 10000,
	waitQueueTimeoutMS: 10000
  });

  cachedDb = client.db("rankings");

  function cleanup () {
	client.close( function () {
	  console.log( "Closed out remaining connections.");
	  // Close db connections, other chores, etc.
	  process.exit();
	});
  
	setTimeout( function () {
	 console.error("Could not close connections in time, forcing shut down");
	 process.exit(1);
	}, 30*1000);
  }
  
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);

  return cachedDb;
};

const queryDatabase = async (db) => {
  const pokemon = await db.collection("rankings").find({}).toArray();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pokemon),
  };
};

const pushToDatabase = async (db, data) => {
	const ids = data.pokemon.map((pokemon) => pokemon.id);
	const winner = data.winner;

	const collection = await db.collection("rankings");

	const [pokeZeroOriginal] = await collection
		.aggregate([{$match: { id: ids[0] }}])
		.toArray();
	const [pokeOneOriginal] = await collection
		.aggregate([{$match: { id: ids[1] }}])
		.toArray();

	const sexyResult = EloRating.calculate(
		pokeZeroOriginal.ranking || 1000,
		pokeOneOriginal.ranking || 1000,
		winner === ids[0]
	);

	const pokeZeroFinal = sexyResult.playerRating;
	const pokeOneFinal = sexyResult.opponentRating;

	await collection.updateOne(
		{ id: ids[0] },
		{ $set: { ranking: pokeZeroFinal } }
	);
	await collection.updateOne(
		{ id: ids[1] },
		{ $set: { ranking: pokeOneFinal } }
	);

	console.log(`${pokemon[ids[0] - 1].name.english} (${ids[0]}) changed from ${pokeZeroOriginal.ranking} to ${pokeZeroFinal}. ${pokemon[ids[1] - 1].name.english}(${ids[1]}) changed from ${pokeOneOriginal.ranking} to ${pokeOneFinal}`)
	return { statusCode: 201 }
};

module.exports.handler = async (event, context) => {
  // otherwise the connection will never complete, since
  // we keep the DB connection alive
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase(MONGODB_URI);

  switch (event.httpMethod) {
    case "GET":
      return queryDatabase(db);
    case "POST":
      return pushToDatabase(db, JSON.parse(event.body));
    default:
      return { statusCode: 400 };
  }
};