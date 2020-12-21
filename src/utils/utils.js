import pokemon from "../data/pokemon.json";

const getRandomInt = (min, max) => {
	const newMin = Math.ceil(min);
	const newMax = Math.floor(max);
	return Math.floor(Math.random() * (newMax - newMin + 1)) + newMin;
};

export const getRandomUniquePokemonPair = () => {
	const int1 = getRandomInt(0, pokemon.length);
	const int2 = getRandomInt(0, pokemon.length);

	if (int1 !== int2) {
		return [pokemon[int1], pokemon[int2]];
	}
	return getRandomUniquePokemonPair();
};

const makeRankingsReadable = (rawRankings) => {
	return rawRankings.map(({ id, ranking }) => {
		const descriptivePokemon = pokemon.find((poke) => poke.id === id);
		return {
			id,
			ranking,
			name: descriptivePokemon.name.english,
		};
	});
};

export const getRankings = async () => {
	const res = await fetch(`${process.env.REACT_APP_SERVERLESS_BASE}/pokemon`,);
	const json = await res.json();
	const readableRankings = makeRankingsReadable(json);
	return readableRankings;
};

export const getAndSetRankings = async (setStateCallback) => {
	const rankings = await getRankings();
	setStateCallback(rankings);
}
