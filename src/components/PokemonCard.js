import { useState, useEffect } from "react";

const pad = (n, width, z) => {
	z = z || "0";
	n = n + "";
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

const PokemonCard = ({ id, name, postMatchResults, reInitPokemon }) => {
	const [pokeImage, setPokeImage] = useState("");

	useEffect(() => {
		import(`../data/images/${pad(id, 3)}.png`).then((image) => {
			setPokeImage(image.default);
		});
	}, [id]);

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
			<img src={pokeImage} alt={name} />
			<button onClick={voteSexier}>Vote Sexier</button>
		</div>
	);
};

export default PokemonCard;
