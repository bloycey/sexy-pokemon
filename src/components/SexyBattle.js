import styled from "styled-components";
import { useState } from "react";
import { getRandomUniquePokemonPair } from "../utils/utils";
import PokemonCard from "./PokemonCard";
import SexiestWidget from "./SexiestWidget";

const HomePanel = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 4rem;
`

const BattleWrapper = styled.div`
	display: inline-flex;
	justify-content: space-between;
	flex: 1;

	@media(min-width: 767px){
		min-width: 600px;
	}
`;

const WidgetWrapper = styled.div`
	width: 90%;
	max-width: 400px;

	@media(min-width: 1200px){
		width: 350px;
	}
`

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
		<HomePanel>
			<BattleWrapper>
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
			</BattleWrapper>
			<WidgetWrapper>
				<SexiestWidget />
			</WidgetWrapper>
		</HomePanel>
	);
};

export default SexyBattle;
