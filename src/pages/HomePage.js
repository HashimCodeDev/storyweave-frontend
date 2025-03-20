import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

function HomePage() {
	const [rooms, setRooms] = useState([]); // Initialize rooms state as an empty array
	const [loading, setLoading] = useState(true); // A loading state to manage UI
	const navigate = useNavigate();

	useEffect(() => {
		// Fetch rooms data with axios
		axios
			.get("http://localhost:8000/rooms")
			.then((response) => {
				setRooms(response.data.data); // Set rooms data in the state
				setLoading(false); // Set loading to false once the data is fetched
			})
			.catch((error) => {
				console.error("Error fetching rooms:", error); // Handle any errors
				setLoading(false); // Set loading to false even on error
			});
	}, []); // Empty dependency array means it will only run once on component mount

	if (loading) {
		return <p>Loading...</p>; // Show a loading message until data is fetched
	}

	return (
		<div className="home-container">
			{rooms.length > 0 ? (
				rooms.map((room) => (
					<div
						className="card"
						key={room.id}
						onClick={() => navigate(`/ws/room/${room.id}`)}
					>
						<div className="card-border-top"></div>
						<div className="img"></div>
						<span> {room.name}</span>
						{/* <p className="job"> Job Title</p> */}
						<button> Join</button>
					</div>
				))
			) : (
				<p>No rooms available</p>
			)}
			<div className="card">
				<div className="card-border-top"></div>
				<div className="img"></div>
				<span>Create New Room</span>
				{/* <p className="job"> Job Title</p> */}
				<button>Create</button>
			</div>
		</div>
	);
}

export default HomePage;
