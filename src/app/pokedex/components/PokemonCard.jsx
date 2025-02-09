import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

function PokemonCard({ url }) {
	const [pokemon, setPokemon] = useState({});

	useEffect(() => {
		axios.get(url).then(({ data }) => setPokemon(data));
	}, [url]);

	if (!pokemon) return <p>Loading...</p>;

	return (
		<Link to={`/pokedex/${pokemon.name}`}>
			<h2>{pokemon?.name}</h2>
			<img src={pokemon?.sprites?.front_default} alt={pokemon.name} />
		</Link>
	);
}

export default PokemonCard;
