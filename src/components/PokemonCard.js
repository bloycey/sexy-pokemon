function importAll(r) {
	return r.keys().map(r);
}

const images = importAll(
	require.context("../data/images", false, /\.(png|jpe?g|svg)$/)
);

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
		<div>
			<h2>{name}</h2>
			<img src={images[id - 1].default} alt={name} />
			<button onClick={voteSexier}>Vote Sexier</button>
		</div>
	);
};

export default PokemonCard;
