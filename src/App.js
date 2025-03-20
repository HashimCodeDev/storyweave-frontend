import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login";
import StoryPage from "./pages/StoryPage";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";

import "./App.css";

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/story" element={<StoryPage />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/ws/room/:roomId" element={<StoryPage />} />
					<Route path="/register" element={<Register />} />
					{/* Add more routes as needed */}
				</Routes>
			</div>
		</Router>
	);
}

export default App;
