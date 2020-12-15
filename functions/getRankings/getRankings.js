const MongoClient = require("mongodb").MongoClient;
const uri = process.env.DB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

const getRankings = async () => {
	await client.connect();
	const data = await client
		.db("rankings")
		.collection("rankings")
		.find({})
		.toArray();
	return data;
};

exports.handler = async function (event, context) {
	const data = await getRankings();

	return {
		statusCode: 200,
		body: JSON.stringify({ message: data }),
	};
};
