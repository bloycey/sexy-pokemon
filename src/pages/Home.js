import SexyBattle from "../components/SexyBattle";
import pokemon from "../data/pokemon.json";
import { getRandomUniquePokemonPair } from "../utils/utils";

const Home = () => {
	return (
		<div>
			<h1>HOMEPAGE</h1>
			<SexyBattle />
		</div>
	);
};

export default Home;
