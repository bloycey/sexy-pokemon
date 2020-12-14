function importAll(r) {
	return r.keys().map(r);
}

const images = importAll(
	require.context("../data/images", false, /\.(png|jpe?g|svg)$/)
);

console.log(images);

const PokemonCard = ({ id, name, postMatchResults, reInitPokemon }) => {
	const voteSexier = () => {
		postMatchResults(id)
			.then((data) => {
				console.log("response data", data);
				reInitPokemon();
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
