import React, { useState } from 'react'
import { Routes, AuthRoutes } from './routes'
import { useAuth } from './context/AuthContext';

function App() {
	const { loginStatus } = useAuth()
	const Router = loginStatus ? <Routes /> : <AuthRoutes />
	return (
		<React.Fragment>
			{Router}
		</React.Fragment>

	);
}

export default App;
