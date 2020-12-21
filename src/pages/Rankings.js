import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import pokemon from "../data/pokemon.json";
import { getAndSetRankings } from "../utils/utils";

const Rankings = () => {
	const [rankings, setRankings] = useState([]);
	useEffect(() => getAndSetRankings(setRankings), []);
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
