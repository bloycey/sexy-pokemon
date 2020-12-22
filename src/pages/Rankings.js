import { useState, useEffect } from "react";
import LeaderboardHero from "../components/LeaderboardHero";
import Nav from "../components/Nav";
import { getAndSetRankings } from "../utils/utils";

const Rankings = () => {
	const [rankings, setRankings] = useState([]);
	useEffect(() => getAndSetRankings(setRankings), []);
	return (
		<div>
			<Nav />
			<LeaderboardHero />
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
