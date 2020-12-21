import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import pokemon from "../data/pokemon.json";

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

const Rankings = () => {
	const [rankings, setRankings] = useState([]);
	useEffect(() => {
		const getRankings = async () => {
			const res = await fetch(`${process.env.REACT_APP_SERVERLESS_BASE}/pokemon`,);
			const json = await res.json();
			return json;
		};
		getRankings().then((response) => {
			console.log(response);
			const readableRankings = makeRankingsReadable(response);
			setRankings(readableRankings);
		});
	}, []);

	return (
		<div>
			<Nav />
			<h1>RankingsPAGE</h1>
			<div>
				{rankings
					.sort((a, b) => b.ranking - a.ranking)
					.map(({ name, ranking }) => (
						<h2 key={name}>
							{name} - {ranking}
						</h2>
					))}
			</div>
		</div>
	);
};

export default Rankings;
