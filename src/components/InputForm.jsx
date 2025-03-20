import React, { useState } from "react";

function InputForm({ onSend }) {
	const [text, setText] = useState("");

	const handleSend = () => {
		if (text.trim()) {
			onSend(text);
			setText(""); // Clear the input after sending
		}
	};

	return (
		<div>
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="Add to the story"
			/>
			<button onClick={handleSend}>Send</button>
		</div>
	);
}

export default InputForm;
