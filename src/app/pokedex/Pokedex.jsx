import { useName } from '../../hooks/useName';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonList from './components/PokemonList';
import { Link } from 'react-router';
import './styles/Pokedex.scss';

const POKEAPI_BASE = 'https://pokeapi.co/api/v2/';
function Pokedex() {
	const [pokemons, setPokemons] = useState([]);
	const [filteredPokemons, setFilteredPokemons] = useState([]);
	const [search, setSearch] = useState('');
	const [selectedType, setSelectedType] = useState('all');
	const [types, setTypes] = useState([]);
	const [singlePokemon, setSinglePokemon] = useState(null);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const pokemonsPerPage = 12;

	const { name } = useName();

	const getInitialPokemons = () => {
		axios.get(`${POKEAPI_BASE}/pokemon?limit=1172`).then(({ data }) => {
			setPokemons(data.results);
			setFilteredPokemons(data.results);
			setSinglePokemon(null);
			setCurrentPage(1);
		});
	};

	useEffect(() => {
		getInitialPokemons();
	}, []);

	useEffect(() => {
		if (!search) {
			setFilteredPokemons(pokemons);
			setSinglePokemon(null);
			setCurrentPage(1);
			return;
		}

		setFilteredPokemons(
			pokemons.filter((pokemon) =>
				pokemon.name.toLowerCase().includes(search.toLowerCase()),
			),
		);
		setCurrentPage(1);
	}, [search, pokemons]);

	useEffect(() => {
		axios
			.get(`${POKEAPI_BASE}type?limit=18`)
			.then(({ data }) => setTypes(data.results));
	}, []);

	useEffect(() => {
		if (selectedType === 'all') {
			getInitialPokemons();
			return;
		}

		axios.get(`${POKEAPI_BASE}/type/${selectedType}`).then(({ data }) => {
			const typePokemons = data.pokemon.map((p) => p.pokemon);
			setPokemons(typePokemons);
			setFilteredPokemons(typePokemons);
			setSinglePokemon(null);
			setCurrentPage(1);
		});
	}, [selectedType]);

	const searchPokemon = () => {
		if (!search) {
			getInitialPokemons();
			return;
		}

		const searchId = parseInt(search, 10);

		axios
			.get(`${POKEAPI_BASE}/pokemon/${searchId}`)
			.then(({ data }) => {
				if (selectedType !== 'all') {
					const isOfType = data.types.some((t) => t.type.name === selectedType);
					if (!isOfType) {
						setSinglePokemon(null);
						alert('El pokémon indicado, NO es del TIPO seleccionado');
						return;
					}
				}
				setSinglePokemon(data);
				setError(null);
			})
			.catch(() => {
				setError('El pokémon no existe');
				setSinglePokemon(null);
			});
	};

	const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);
	const indexOfLastPokemon = currentPage * pokemonsPerPage;
	const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
	const currentPokemons = filteredPokemons.slice(
		indexOfFirstPokemon,
		indexOfLastPokemon,
	);

	return (
		<div className="pokedex-container">
			<h2 className="pokedex-title">POKÉDEX</h2>
			{name && (
				<p className="pokedex-welcome">
					¡Bienvenido {name}!, aquí podrás encontrar a tu pokémon favorito.
				</p>
			)}
			<div className="pokedex-controls">
				<input
					type="text"
					className="pokedex-search"
					placeholder="Busca un pokémon"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					onKeyDown={(e) => e.key === 'Enter' && searchPokemon()}
				/>
				<button className="pokedex-button" onClick={searchPokemon}>
					Buscar
				</button>
				<select
					className="pokedex-select"
					value={selectedType}
					onChange={(e) => setSelectedType(e.target.value)}
				>
					<option value="all">Todos</option>
					{types.map((type) => (
						<option key={type.name} value={type.name}>
							{type.name}
						</option>
					))}
				</select>
			</div>

			{singlePokemon ? (
				<Link className="pokedex-single" to={`/pokedex/${singlePokemon.name}`}>
					<h2>{singlePokemon.name}</h2>
					<img
						src={singlePokemon.sprites?.front_default}
						alt={singlePokemon.name}
					/>
				</Link>
			) : (
				<>
					<PokemonList pokemon={currentPokemons} />
					<div className="pagination">
						<button
							onClick={() => setCurrentPage(1)}
							disabled={currentPage === 1}
						>
							1
						</button>
						<button
							onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
							disabled={currentPage === 1}
						>
							Anterior
						</button>
						<span>
							Página {currentPage} de {totalPages}
						</span>
						<button
							onClick={() =>
								setCurrentPage((prev) => Math.min(prev + 1, totalPages))
							}
							disabled={currentPage === totalPages}
						>
							Siguiente
						</button>
						<button
							onClick={() => setCurrentPage(totalPages)}
							disabled={currentPage === totalPages}
						>
							{totalPages}
						</button>
					</div>
				</>
			)}
		</div>
	);
}

export default Pokedex;
