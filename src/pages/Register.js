import React, { useState } from "react";
import axios from "axios";
import "../styles/Register.css";

const Register = () => {
	const url = process.env.BACKEND_URL || "http://localhost:8000";

	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const [error, setError] = useState(null); // To handle error messages
	const [success, setSuccess] = useState(null); // To handle success messages

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.username || !formData.password) {
			alert("Please fill in both username and password!");
			return;
		}

		try {
			// Send the data to the backend (FastAPI)
			const response = await axios.post(`${url}/register`, {
				username: formData.username,
				password: formData.password,
			});

			// Handle the response from the server (success)
			console.log("Registration successful:", response.data);
			setSuccess("Registration successful!"); // Show success message
			setError(null); // Reset any previous errors

			// Optionally clear the form or redirect the user
			setFormData({
				username: "",
				password: "",
			});
		} catch (err) {
			// Handle errors here, e.g., show error message
			console.error("Error during registration:", err);
			setError("Registration failed. Please try again.");
			setSuccess(null); // Reset success message if there's an error
		}
	};

	return (
		<div className="register-container">
			<h2>Register</h2>

			{/* Display success message */}
			{success && <p className="success-message">{success}</p>}

			{/* Display error message */}
			{error && <p className="error-message">{error}</p>}

			<form onSubmit={handleSubmit}>
				<div className="input-group">
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						name="username"
						value={formData.username}
						onChange={handleChange}
						required
						placeholder="Enter your username"
					/>
				</div>

				<div className="input-group">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
						placeholder="Enter your password"
					/>
				</div>

				<button type="submit" className="submit-btn">
					Register
				</button>
			</form>

			<p>
				Already have an account? <a href="/">Login here</a>
			</p>
		</div>
	);
};

export default Register;
