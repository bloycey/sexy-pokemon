import styled from "styled-components";

const importAll = (r) => r.keys().map(r);

const images = importAll(
	require.context("../data/images", false, /\.(png|jpe?g|svg)$/)
);

const PokeFrame = styled.picture`
	border: 10px solid var(--black);
	background-color: #ffffff;
	position: relative;
	display: inline-block;
	width: 340px;
	height: 340px;

	img {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

const PokeWrapper =styled.div`
	display: flex;
	flex-direction: column;
	margin-right: 4rem;
`;

const VoteButton = styled.button`
	margin-top: 2rem;
	border: 0;
	box-shadow: 0;
	background-color: var(--black);
	color: #fff;
	text-transform: uppercase;
	text-align: center;
	font-size: 24px;
	padding: 1rem;
	cursor: pointer;
	font-weight: 700;
	font-family: 'Rubik'
`

const PokemonCard = ({ id, name, postMatchResults, reInitPokemon }) => {
	const voteSexier = () => {
		reInitPokemon();
		postMatchResults(id)
			.then((data) => {
				console.log("response data", data);
			})
			.catch((err) => console.log(err));
	};

	return (
		<PokeWrapper>
			<PokeFrame>
				<img src={images[id - 1].default} alt={name} />
			</PokeFrame>
			<VoteButton onClick={voteSexier}>Vote {name}</VoteButton>
		</PokeWrapper>
	);
};

export default PokemonCard;
