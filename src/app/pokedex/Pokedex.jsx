import { useName } from '../../hooks/useName';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import PokemonList from './components/PokemonList';
const POKEAPI_BASE = 'https://pokeapi.co/api/v2/';

function Pokedex() {
	const { name, clearName } = useName();
	const [search, setSearch] = useState('');
	const [pokemon, setPokemon] = useState([]);
	const [filteredPokemon, setFilteredPokemon] = useState(pokemon);
	const [selectedType, setSelectedType] = useState('all');
	const [types, setTypes] = useState([]);
	const [singlePokemon, setSinglePokemon] = useState(null);

	const getFirstPokemon = () => {
		axios.get(`${POKEAPI_BASE}pokemon?limit=151`).then(({ data }) => {
			setPokemon(data.results);
			setFilteredPokemon(data.results);
			setSinglePokemon(null);
		});
	};

	useEffect(() => {
		getFirstPokemon();
	}, []);

	useEffect(() => {
		axios
			.get(`${POKEAPI_BASE}type?limit=18`)
			.then(({ data }) => setTypes(data.results));
	}, []);

	useEffect(() => {
		if (!search) {
			setFilteredPokemon(pokemon);
			setSinglePokemon(null);
			return;
		}

		setFilteredPokemon(
			pokemon.filter((poke) =>
				poke.name.toLowerCase().includes(search.toLowerCase()),
			),
		);
	}, [search, pokemon]);

	useEffect(() => {
		if (selectedType === 'all') {
			setFilteredPokemon(pokemon);
			return;
		}

		axios.get(`${POKEAPI_BASE}type/${selectedType}`).then(({ data }) => {
			const typePokemon = data.pokemon.map((poke) => poke.pokemon);
			setPokemon(typePokemon);
			setFilteredPokemon(typePokemon);
		});
	}, [selectedType, pokemon]);

	const searchPokemon = () => {
		if (!search) {
			getFirstPokemon();
			return;
		}

		axios
			.get(`${POKEAPI_BASE}pokemon/${search}`)
			.then(({ data }) => {
				if (selectedType !== 'all') {
					const isOfType = data.types.some(
						(type) => type.type.name === selectedType,
					);
					if (!isOfType) {
						setSinglePokemon(null);
						alert('This Pokémon is not of the selected type');
						return;
					}
				}
				setSinglePokemon(data);
			})
			.catch(() => alert('Pokémon not found'));
	};

	return (
		<div>
			<h1>Pokédex</h1>
			{name && (
				<p>Welcome, {name}! You can search your favorite Pokémon here 🥳</p>
			)}
			<input
				type="text"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Filter or search by name or ID"
				onKeyDown={(e) => e.key === 'Enter' && searchPokemon()}
			/>
			<button onClick={searchPokemon}>Search</button>
			<select
				value={selectedType}
				onChange={(e) => setSelectedType(e.target.value)}
			>
				<option value="all">all</option>
				{types.map((type) => (
					<option key={type.name} value={type.name}>
						{type.name}
					</option>
				))}
			</select>

			<pre>
				{singlePokemon ? (
					<Link to={`/pokedex/${singlePokemon?.name}`}>
						<h2>{singlePokemon?.name}</h2>
						<img
							src={singlePokemon?.sprites?.front_default}
							alt={singlePokemon?.name}
						/>
					</Link>
				) : (
					<PokemonList pokemon={filteredPokemon} />
				)}
			</pre>

			<PokemonList pokemon={filteredPokemon} />
		</div>
	);
}

export default Pokedex;
