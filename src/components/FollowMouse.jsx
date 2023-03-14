import { useEffect, useState } from 'react';

export const FollowMouse = () => {
	const [enabled, setEnabled] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	//pointer move effect
	useEffect(() => {
		//console.log('efecto', { enabled });
		const handleMove = event => {
			const { clientX, clientY } = event;
			//console.log('handleMove', { clientX, clientY });
			setPosition({ x: clientX, y: clientY });
		};

		if (enabled) {
			window.addEventListener('pointermove', handleMove);
		}

		//here we clean the event
		//when the component is desmounted
		//and when change the dependencies, before executing the efect again
		return () => {
			window.removeEventListener('pointermove', handleMove);
			setPosition({ x: 0, y: 0 });
		};
	}, [enabled]);

	// [] --> It's executed once when the component is mounted
	// [enabled] --> It's executed as much as the dependency
	//changes and when the component is mounted.
	//It's executed every time the component is rendered

	//change body className
	useEffect(() => {
		document.body.classList.toggle('no-cursor', enabled);

		return () => {
			document.body.classList.remove('no-cursor');
		};
	}, [enabled]);

	return (
		<>
			<div
				style={{
					position: 'absolute',
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					border: '1px solid #fff',
					borderRadius: '50%',
					opacity: 0.8,
					pointerEvents: 'none',
					left: -25,
					top: -25,
					width: 50,
					height: 50,
					transform: `translate(${position.x}px, ${position.y}px)`,
				}}
			/>
			<button onClick={() => setEnabled(!enabled)}>
				{enabled ? 'Desactivar' : 'Activar'} seguir puntero
			</button>
		</>
	);
};
