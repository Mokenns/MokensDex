import PokemonCard from './PokemonCard';
import '../styles/PokemonList.scss';

function PokemonList({ pokemon }) {
	return (
		<div className="pokelist">
			{pokemon.map((poke) => (
				<PokemonCard key={poke.name} url={poke.url} />
			))}
		</div>
	);
}

export default PokemonList;
