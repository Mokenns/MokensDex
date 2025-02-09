import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import '../styles/PokemonCard.scss';

function PokemonCard({ url }) {
	const [pokemon, setPokemon] = useState({});

	useEffect(() => {
		axios.get(url).then(({ data }) => setPokemon(data));
	}, [url]);

	if (!pokemon) return <p>Loading...</p>;

	const types = pokemon?.types?.map((t) => t.type.name);
	const ability = pokemon?.abilities?.map((a) => a.ability.name);
	const [hp, attack, defense, specialAttack, specialDefense, speed] =
		pokemon?.stats || [];

	return (
		<Link
			to={`/pokedex/${pokemon.name}`}
			className={`pokecard type--${types?.[0]}`}
		>
			<div className="pokecard__header">
				<img
					src={pokemon?.sprites?.other['official-artwork']?.front_default}
					alt={pokemon.name}
					className="pokecard__header-img"
				/>
			</div>
			<div className="pokecard__body">
				<h2 className="pokecard__body-name">{pokemon?.name}</h2>
				<h3 className="pokecard__body-types">{types?.join(' / ')}</h3>
				<p className="pokecard__body-types-label">Types</p>

				<div className="pokecard__stats">
					<div className="pokecard__stats-item">
						HP <span>{hp?.base_stat}</span>
					</div>
					<div className="pokecard__stats-item">
						Atk <span>{attack?.base_stat}</span>
					</div>
					<div className="pokecard__stats-item">
						Def <span>{defense?.base_stat}</span>
					</div>
					<div className="pokecard__stats-item">
						Sp Atk <span>{specialAttack?.base_stat}</span>
					</div>
					<div className="pokecard__stats-item">
						Sp Def <span>{specialDefense?.base_stat}</span>
					</div>
					<div className="pokecard__stats-item">
						Speed <span>{speed?.base_stat}</span>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default PokemonCard;
