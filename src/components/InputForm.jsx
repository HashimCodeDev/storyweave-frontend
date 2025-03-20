import React, { useState } from "react";
import styled from "styled-components";

function InputForm({ onSend }) {
	const [text, setText] = useState("");

	const handleSend = () => {
		if (text.trim()) {
			onSend(text);
			setText(""); // Clear the input after sending
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleSend();
		}
	};

	return (
		<StyledWrapper>
			<div className="messageBox">
				<input
					required
					placeholder="Message..."
					type="text"
					id="messageInput"
					value={text}
					onChange={(e) => setText(e.target.value)}
					onKeyDown={handleKeyDown}
					autoComplete="off"
				/>
				<button id="sendButton" onClick={handleSend}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 664 663"
					>
						<path
							fill="none"
							d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
						/>
						<path
							strokeLinejoin="round"
							strokeLinecap="round"
							strokeWidth="33.67"
							stroke="#6c6c6c"
							d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
						/>
					</svg>
				</button>
			</div>
		</StyledWrapper>
	);
}

const StyledWrapper = styled.div`
	.messageBox {
		width: fit-content;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #2d2d2d;
		padding: 0 15px;
		border-radius: 10px;
		border: 1px solid rgb(63, 63, 63);
	}
	.messageBox:focus-within {
		border: 1px solid rgb(110, 110, 110);
	}

	#messageInput {
		width: 200px;
		height: 100%;
		background-color: transparent;
		outline: none;
		border: none;
		padding-left: 10px;
		color: white;
	}
	#messageInput:focus ~ #sendButton svg path,
	#messageInput:valid ~ #sendButton svg path {
		fill: #3c3c3c;
		stroke: white;
	}

	#sendButton {
		width: fit-content;
		height: 100%;
		background-color: transparent;
		outline: none;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s;
	}
	#sendButton svg {
		height: 18px;
		transition: all 0.3s;
	}
	#sendButton svg path {
		transition: all 0.3s;
	}
	#sendButton:hover svg path {
		fill: #3c3c3c;
		stroke: white;
	}
`;

export default InputForm;
