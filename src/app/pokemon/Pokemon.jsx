import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
const POKEAPI_BASE = 'https://pokeapi.co/api/v2/';

function Pokemon() {
	const params = useParams();
	const [pokemon, setPokemon] = useState({});
	const types = pokemon?.types?.map((t) => t.type.name);
	const ability = pokemon?.abilities?.map((a) => a.ability.name);
	const [hp, attack, defense, specialAttack, specialDefense, speed] =
		pokemon?.stats || [];

	useEffect(() => {
		if (params.id) {
			axios
				.get(`${POKEAPI_BASE}pokemon/${params.id}`)
				.then(({ data }) => setPokemon(data));
		}
	}, [params]);

	console.log(pokemon);

	return (
		<div>
			<img src={pokemon?.sprites?.front_default} alt={pokemon.name} />
			<span># {pokemon?.id?.toString().padStart(3, 0)}</span>
			<h2>{pokemon?.name}</h2>
			<p>Weight: {pokemon?.weight}</p>
			<p>Height: {pokemon?.height}</p>
			<p>Types: {types?.join(',')}</p>
			<p>Abilities: {ability?.join(',')}</p>
			<p>
				HP: <span>{hp?.base_stat}</span>
			</p>
			<p>
				Atk: <span>{attack?.base_stat}</span>
			</p>
			<p>
				Def: <span>{defense?.base_stat}</span>
			</p>
			<p>
				Sp. Atk.: <span>{specialAttack?.base_stat}</span>
			</p>
			<p>
				Sp. Def.: <span>{specialDefense?.base_stat}</span>
			</p>
			<p>
				Speed: <span>{speed?.base_stat}</span>
			</p>
			<ul>
				{pokemon?.moves?.map((m) => (
					<li key={m.move.name}>{m.move.name}</li>
				))}
			</ul>
		</div>
	);
}

export default Pokemon;
