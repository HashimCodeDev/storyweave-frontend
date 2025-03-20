import React from "react";

function TwistVoting({ twist, onVote }) {
	return (
		<div id="twist">
			<p>Twist suggested: {twist}</p>
			<button onClick={() => onVote("yes")}>Yes</button>
			<button onClick={() => onVote("no")}>No</button>
		</div>
	);
}

export default TwistVoting;
