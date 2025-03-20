import React from "react";
import "../styles/StoryPage.css";

function StoryDisplay({ story }) {
	return (
		<div className="story-display">
			<p className="text-body">{story}</p>
		</div>
	);
}

export default StoryDisplay;
