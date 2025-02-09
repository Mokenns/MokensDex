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
			{name && <h2>Welcome, {name}!</h2>}
			<h1>Mokens' Pokédex site! 🥳</h1>
			<p>Enter your name:</p>
			<input
				type="text"
				ref={inputRef}
				onKeyDown={(e) => e.key === 'Enter' && handleSetName()}
			/>
			<button className="btn" onClick={handleSetName}>
				Start!
			</button>
		</div>
	);
}

export default Home;
