import PokemonCard from './PokemonCard';

function PokemonList({ pokemon }) {
	return (
		<>
			{pokemon.map((poke) => (
				<PokemonCard key={poke.name} url={poke.url} />
			))}
		</>
	);
}

export default PokemonList;
