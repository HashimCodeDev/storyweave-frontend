import React, { useState, useEffect } from "react";
import axios from "axios";

function HomePage() {
	const [rooms, setRooms] = useState([]); // Initialize rooms state as an empty array
	const [loading, setLoading] = useState(true); // A loading state to manage UI

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
		<div>
			{rooms.length > 0 ? (
				rooms.map((room) => (
					<div key={room.id}>
						<h3>{room.name}</h3>
						<p>{}</p>
					</div>
				))
			) : (
				<p>No rooms available</p>
			)}
		</div>
	);
}

export default HomePage;
