import { useRef } from 'react';
import { useName } from '../../hooks/useName';
import { useNavigate } from 'react-router';
import './styles/home.scss';
function Home() {
	const { setName, name } = useName();
	const inputRef = useRef();
	const navigate = useNavigate();
	const handleSetName = () => {
		if (!inputRef.current.value) return;
		setName(inputRef.current.value);
		navigate('/pokedex');
	};
	return (
		<div className="home">
			<div className="home-card">
				<h2 className="home-title">POKÉDEX</h2>
				<h3 className="home-greeting">¡Hola, entrenador!</h3>
				<p className="home-text">Para comenzar, ingresa tu nombre:</p>
				<input
					type="text"
					ref={inputRef}
					className="home-input"
					placeholder="Tu nombre..."
					onKeyDown={(e) => e.key === 'Enter' && handleSetName()}
				/>
				<button className="home-button" onClick={handleSetName}>
					Comenzar
				</button>
			</div>
		</div>
	);
}

export default Home;
