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
