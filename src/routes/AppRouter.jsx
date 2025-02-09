import { Routes, Route } from 'react-router';
import Home from '../app/home/Home';
import Pokedex from '../app/pokedex/Pokedex';
import Pokemon from '../app/pokemon/Pokemon';

function AppRouter() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />

			<Route path="/pokedex">
				<Route index element={<Pokedex />} />
				<Route path=":id" element={<Pokemon />} />
			</Route>
		</Routes>
	);
}

export default AppRouter;
