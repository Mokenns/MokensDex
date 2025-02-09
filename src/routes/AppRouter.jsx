import { Routes, Route } from 'react-router';
import Home from '../app/home/Home';
import Pokedex from '../app/pokedex/Pokedex';
import Pokemon from '../app/pokemon/Pokemon';
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';
function AppRouter() {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<PublicRoute>
						<Home />
					</PublicRoute>
				}
			/>

			<Route path="/pokedex" element={<ProtectedRoute />}>
				<Route index element={<Pokedex />} />
				<Route path=":id" element={<Pokemon />} />
			</Route>
		</Routes>
	);
}

export default AppRouter;
