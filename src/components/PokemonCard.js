import styled from "styled-components";

const importAll = (r) => r.keys().map(r);

const images = importAll(
	require.context("../data/images", false, /\.(png|jpe?g|svg)$/)
);

const PokeFrame = styled.picture`
	border: 6px solid var(--black);
	background-color: #ffffff;
	position: relative;
	display: inline-block;
	width: 100%;
	max-width: 100%;
	padding-bottom: 100%;
	margin: 0 auto;
	margin-bottom: 1rem;
	box-sizing: border-box;

	img {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		max-width: 110%;
	}

	@media(min-width: 767px) {
		border: 10px solid var(--black);
	}
`;

const PokeWrapper =styled.div`
	display: flex;
	flex-direction: column;
	width: 49%;
`;

const VoteButton = styled.button`
	width: 100%;
	margin: 0 auto;
	margin-bottom: 2rem;
	border: 0;
	border-left: 4px solid var(--red);
	background-color: var(--black);
	color: #fff;
	text-transform: uppercase;
	text-align: center;
	font-size: 18px;
	padding: 1rem;
	cursor: pointer;
	font-weight: 700;
	font-family: 'Rubik';
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	transition: all 0.2s ease;

	span {
		display: none;
	}

	@media(min-width: 767px){
		font-size: 24px;
		span {
			display: inline;
		}
	}

	&:hover {
		filter: brightness(135%);
	}

	&:active {
		background-color: var(--red);
	}

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
			<VoteButton onClick={voteSexier}><span>Vote </span>{name}</VoteButton>
		</PokeWrapper>
	);
};

export default PokemonCard;
