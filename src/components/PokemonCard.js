import { useState, useEffect } from "react";
import { pad } from "../utils/utils";

const PokemonCard = ({ id, name }) => {
	const [pokeImage, setPokeImage] = useState("");

	useEffect(() => {
		import(`../data/images/${pad(id, 3)}.png`).then((image) => {
			setPokeImage(image.default);
		});
	});

	const voteSexier = () => {
		// Fire off vote to db
	};

	return (
		<div onClick={voteSexier}>
			<h2>{name}</h2>
			<img src={pokeImage} alt={name} />
		</div>
	);
};

export default PokemonCard;
