import { useState, useEffect } from "react";
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
			const res = await fetch(
				`${process.env.REACT_APP_SERVERLESS_BASE}/getRankings`,
				{
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
				}
			);
			const json = await res.json();
			return json;
		};
		getRankings().then((response) => {
			console.log(response);
			const readableRankings = makeRankingsReadable(response.message);
			setRankings(readableRankings);
		});
	}, []);

	return (
		<div>
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
