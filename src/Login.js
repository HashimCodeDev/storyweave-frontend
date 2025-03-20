import React, { useState } from "react";
import "./styles/Login.css";
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
			const response = await axios.post("http://127.0.0.1:8000/login", {
				username: email,
				password: password,
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.detail || "Login failed");
			}

			const data = await response.json();
			const { access_token } = data;

			localStorage.setItem("token", access_token);
			navigate("/story");
		} catch (err) {
			setError(error.response?.data?.detail || "An error occurred");
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
						type="username"
						className="input-mail"
						value={email} // Controlled input
						onChange={(e) => setEmail(e.target.value)} // Update state on change
						required
					/>
					<span> </span>
				</div>
				<section className="bg-stars">
					<span className="star" />
					<span className="star" />
					<span className="star" />
					<span className="star" />
				</section>
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

				{error && <p className="error">{error}</p>}
				<button className="submit" type="submit">
					<span className="sign-text">Sign in</span>
				</button>
				<p className="signup-link">
					No account?
					<a className="up" href>
						Sign up!
					</a>
				</p>
			</form>
		</div>
	);
};
export default Login;
