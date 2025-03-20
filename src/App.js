import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./Login";
import StoryPage from "./StoryPage";
import "./App.css";

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/story" element={<StoryPage />} />
					{/* Add more routes as needed */}
				</Routes>
			</div>
		</Router>
	);
}

export default App;
