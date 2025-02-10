import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import './styles/Pokemon.scss';
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
		<div className={`pokemon type--${types?.[0]}`}>
			<img
				className="pokemon__img"
				src={pokemon?.sprites?.other['official-artwork']?.front_default}
				alt={pokemon.name}
			/>
			<span className="pokemon__id">
				# {pokemon?.id?.toString().padStart(3, 0)}
			</span>
			<h2 className="pokemon__name">{pokemon?.name}</h2>
			<p className="pokemon__info">
				Weight: {pokemon?.weight} lb Height: {pokemon?.height} inches
			</p>
			<p className="pokemon__data">Types: {types?.join('  ').toUpperCase()}</p>
			<p className="pokemon__data">Abilities: {ability?.join(',')}</p>
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
