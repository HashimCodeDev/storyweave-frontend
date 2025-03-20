import React, { useState, useEffect } from "react";
import StoryDisplay from "../components/StoryDisplay";
import InputForm from "../components/InputForm";

function StoryPage({ onSend }) {
	const [story, setStory] = useState("");
	const [twist, setTwist] = useState(null);
	const [twistId, setTwistId] = useState(null);
	const [username, setUsername] = useState("");
	const [ws, setWs] = useState(null);
	const url = process.env.BACKEND_URL || "http://localhost:8000";

	useEffect(() => {
		// Prompt user for a username when the app loads
		const user = localStorage.getItem("username");
		setUsername(user);

		// Hardcode the room ID for now; you can make this dynamic later
		const roomId = localStorage.getItem("roomId");
		const socket = new WebSocket(
			`ws://${url}/ws/${roomId}?username=${username}`
		);
		setWs(socket);

		socket.onopen = () => {
			console.log("WebSocket connected");
			// Request the latest story when connected
			socket.send(JSON.stringify({ type: "get_story" }));
		};

		socket.onmessage = (event) => {
			const message = JSON.parse(event.data);
			if (message.type === "story_update") {
				setStory(message.story);
				if (message.twist_accepted) {
					setTwist(null);
					setTwistId(null);
				}
			} else if (message.type === "twist_suggestion") {
				setTwist(message.twist);
				setTwistId(message.twist_id);
			} else if (message.type === "twist_rejected") {
				setTwist(null);
				setTwistId(null);
			}
		};

		socket.onclose = () => {
			console.log("WebSocket disconnected");
		};

		// Clean up the WebSocket connection when the component unmounts
		return () => {
			socket.close();
		};
	}, [username, url]);

	useEffect(() => {
		// Append twist to story when twist is updated
		if (twist) {
			setStory((prevStory) => `${prevStory} ${twist}`);
		}
	}, [twist]);

	const sendAddition = (text) => {
		if (ws) {
			ws.send(JSON.stringify({ type: "add", text }));
		}
	};

	return (
		<div className="story-page">
			<h1 style={{ color: "white" }}>StoryWeave</h1>
			<StoryDisplay story={story} />
			<InputForm onSend={sendAddition} />
		</div>
	);
}

export default StoryPage;
