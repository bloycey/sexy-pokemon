import styled from "styled-components";
import Hero from "../components/Hero";
import { Container } from "../components/Layout";
import Nav from "../components/Nav";
import SexyBattle from "../components/SexyBattle";

const BattleOverlap = styled.div`
	margin: 0 auto;
	margin-top: -2rem;

	@media(min-width: 767px){
		margin-top: -5rem;
	}
`;

const Home = () => {
	return (
		<>
			<Nav />
			<Hero />
			<Container>
				<BattleOverlap>
					<SexyBattle />
				</BattleOverlap>
			</Container>
		</>
	);
};

export default Home;
