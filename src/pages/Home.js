import { Container } from "../components/Layout";
import SexyBattle from "../components/SexyBattle";
import pokemon from "../data/pokemon.json";
import { getRandomUniquePokemonPair } from "../utils/utils";



const Home = () => {
	return (
			<Container>
				<SexyBattle />
			</Container>
	);
};

export default Home;
