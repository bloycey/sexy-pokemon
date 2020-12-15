import { useState, useEffect } from "react";
import { getRandomUniquePokemonPair } from "../utils/utils";
import PokemonCard from "./PokemonCard";

const buildPostMatchResults = (pokemon) => async (winner) => {
	const res = await fetch(
		`${process.env.REACT_APP_SERVERLESS_BASE}/pokemon`,
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
	return res;
};

const SexyBattle = () => {
	const [pokemon, setPokemon] = useState(getRandomUniquePokemonPair());
	const reInitPokemon = () => setPokemon(getRandomUniquePokemonPair());

	const postMatchResults = buildPostMatchResults(pokemon);

	return (
		<div>
			<h1>BATTLE</h1>
			<div style={{ display: 'flex'}}>
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
			</div>
			{/* <button onClick={reInitPokemon}>New battle</button> */}
		</div>
	);
};

export default SexyBattle;
