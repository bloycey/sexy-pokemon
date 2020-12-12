import { useState, useEffect } from "react";
import { getRandomUniquePokemonPair } from "../utils/utils";
import PokemonCard from "./PokemonCard";

const SexyBattle = () => {
	const [pokemon, setPokemon] = useState(getRandomUniquePokemonPair());
	const reinitPokemon = () => setPokemon(getRandomUniquePokemonPair());

	return (
		<div>
			<h1>BATTLE</h1>
			{pokemon.map((poke, index) => {
				return (
					<PokemonCard
						id={poke.id}
						name={poke.name.english}
						key={index}
					/>
				);
			})}
			<button onClick={reinitPokemon}>New battle</button>
		</div>
	);
};

export default SexyBattle;
