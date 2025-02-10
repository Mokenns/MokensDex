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
		<div className="pokemon">
			<img
				className="pokemon__img"
				src={pokemon?.sprites?.other['official-artwork']?.front_default}
				alt={pokemon.name}
			/>
			<span className="pokemon-id">
				# {pokemon?.id?.toString().padStart(3, 0)}
			</span>
			<h2 className="pokemon-name">{pokemon?.name}</h2>
			<p className="pokemon-info">Weight: {pokemon?.weight}</p>
			<p className="pokemon-info">Height: {pokemon?.height}</p>
			<p>Types: {types?.join(',')}</p>
			<p>Abilities: {ability?.join(',')}</p>
			<p className="pokemon__stats">
				HP: <span>{hp?.base_stat}</span>
			</p>
			<p className="pokemon__stats">
				Atk: <span>{attack?.base_stat}</span>
			</p>
			<p className="pokemon__stats">
				Def: <span>{defense?.base_stat}</span>
			</p>
			<p className="pokemon__stats">
				Sp. Atk.: <span>{specialAttack?.base_stat}</span>
			</p>
			<p className="pokemon__stats">
				Sp. Def.: <span>{specialDefense?.base_stat}</span>
			</p>
			<p className="pokemon__stats">
				Speed: <span>{speed?.base_stat}</span>
			</p>
			<p className="pokemon__moves">Moves:</p>
			<ul className="pokemon__moves-list">
				{pokemon?.moves?.map((m) => (
					<li className="pokemon__moves-list-item" key={m.move.name}>
						{m.move.name}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Pokemon;
