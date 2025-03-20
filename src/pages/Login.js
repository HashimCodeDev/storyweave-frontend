import React, { useState } from "react";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null); // Clear previous errors

		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/login",
				{
					username: email,
					password: password,
				},
				{
					headers: { "Content-Type": "application/json" },
				}
			);

			const { access_token } = response.data;

			localStorage.setItem("username", email);
			localStorage.setItem("token", access_token);
			navigate("/home");
		} catch (err) {
			console.error("Login error:", err);

			if (err.response) {
				setError(err.response.data?.detail || "Invalid response from server");
			} else {
				setError("Could not connect to server. Please try again.");
			}
		}
	};

	return (
		<div className="login-container">
			<form className="form" onSubmit={handleSubmit}>
				<div className="form-title">
					<span>sign in to your</span>
				</div>
				<div className="title-2">
					<span>SPACE</span>
				</div>
				<div className="input-container">
					<input
						placeholder="Username"
						type="text"
						className="input-mail"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="input-container">
					<input
						placeholder="Password"
						type="password"
						className="input-pwd"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>

				{error && (
					<p className="error" role="alert">
						{error}
					</p>
				)}

				<button className="submit" type="submit">
					<span className="sign-text">Sign in</span>
				</button>
				<p className="signup-link">
					No account?
					<a className="up" href="/register">
						Sign up!
					</a>
				</p>
			</form>
		</div>
	);
};

export default Login;
