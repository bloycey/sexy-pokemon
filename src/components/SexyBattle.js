import { useState, useEffect } from "react";
import { getRandomUniquePokemonPair } from "../utils/utils";
import PokemonCard from "./PokemonCard";

//	fetch("https://sexy-pokemon.netlify.app/.netlify/functions/updateRanking", {

import pokemonJson from "../data/pokemon.json";

const pokemonRankings = pokemonJson.map((pokemon) => {
	return {
		id: pokemon.id,
		ranking: 1000,
	};
}, {});

console.log(JSON.stringify(pokemonRankings));

const buildPostMatchResults = (pokemon) => async (winner) => {
	const res = await fetch(
		`${process.env.REACT_APP_SERVERLESS_BASE}/updateRanking`,
		{
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				pokemon,
				winner,
			}),
		}
	);
	const json = await res.json();
	return json;
};

const SexyBattle = () => {
	const [pokemon, setPokemon] = useState(getRandomUniquePokemonPair());
	const reInitPokemon = () => setPokemon(getRandomUniquePokemonPair());

	const postMatchResults = buildPostMatchResults(pokemon);

	return (
		<div>
			<h1>BATTLE</h1>
			{pokemon.map((poke, index) => {
				return (
					<PokemonCard
						id={poke.id}
						name={poke.name.english}
						postMatchResults={postMatchResults}
						reInitPokemon={reInitPokemon}
						key={index}
					/>
				);
			})}
			<button onClick={reInitPokemon}>New battle</button>
		</div>
	);
};

export default SexyBattle;
