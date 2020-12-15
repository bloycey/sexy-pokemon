const EloRating = require("elo-rating");

exports.handler = async function (event, context) {
	const body = JSON.parse(event.body);
	const pokeZeroName = body.pokemon[0].name.english;
	const pokeOneName = body.pokemon[1].name.english;

	const ids = body.pokemon.map((pokemon) => pokemon.id);
	const winner = body.winner;

	const MongoClient = require("mongodb").MongoClient;
	const uri = process.env.DB_URI;
	const client = new MongoClient(uri, { useNewUrlParser: true });

	client.connect(async (err) => {
		const db = await client.db("rankings");
		const collection = await db.collection("rankings");
		const [pokeZeroOriginal] = await collection
			.find({ id: ids[0] })
			.toArray();
		const [pokeOneOriginal] = await collection
			.find({ id: ids[1] })
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
		console.log(
			`${pokeZeroName} (${ids[0]}) changed from ${pokeZeroOriginal.ranking} to ${pokeZeroFinal}. ${pokeOneName} (${ids[1]}) changed from ${pokeOneOriginal.ranking} to ${pokeOneFinal}`
		);
		client.close();
	});

	return {
		statusCode: 200,
		body: JSON.stringify("Success"),
	};
};
