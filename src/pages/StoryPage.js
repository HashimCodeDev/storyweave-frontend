import React, { useState, useEffect } from "react";
import StoryDisplay from "../components/StoryDisplay";
import InputForm from "../components/InputForm";
import TwistVoting from "../components/TwistVoting";

function StoryPage({ onSend }) {
	const [story, setStory] = useState("");
	const [twist, setTwist] = useState(null);
	const [twistId, setTwistId] = useState(null);
	const [username, setUsername] = useState("");
	const [ws, setWs] = useState(null);

	useEffect(() => {
		// Prompt user for a username when the app loads
		const user = localStorage.getItem("username");
		setUsername(user);

		// Hardcode the room ID for now; you can make this dynamic later
		const roomId = "room1";
		const socket = new WebSocket(
			`ws://localhost:8000/ws/${roomId}?username=${username}`
		);
		setWs(socket);

		socket.onopen = () => {
			console.log("WebSocket connected");
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
	}, [username]);

	const sendAddition = (text) => {
		if (ws) {
			ws.send(JSON.stringify({ type: "add", text }));
		}
	};

	const sendVote = (vote) => {
		if (ws && twistId) {
			ws.send(JSON.stringify({ type: "vote", vote, twist_id: twistId }));
		}
	};

	return (
		<div>
			<h1>StoryWeave</h1>
			<StoryDisplay story={story} />
			<InputForm onSend={sendAddition} />
			{twist && <TwistVoting twist={twist} onVote={sendVote} />}
		</div>
	);
}

export default StoryPage;
