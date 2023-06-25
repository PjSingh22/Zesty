import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

  const isEmail = (email) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
  }

  const hasWhiteSpace = (input) => {
    return /\s/g.test(input);
  }

	const handleSubmit = async (e) => {
		e.preventDefault();
    const errObj = {}

    if(!isEmail(email)) {
      errObj["email"] = "Please provide a valid email"
    }

    if (hasWhiteSpace(username)) errObj["username"] = "username cannot contain spaces";

    if (hasWhiteSpace(password)) errObj["password"] = "password cannot contain spaces";

    if(Object.values(errObj).length > 0){
      setErrors(errObj)
      return
    };
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="signup">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{Object.values(errors).map((error, idx) => (
						<li style={{color: "red"}} key={idx}>{error}</li>
					))}
				</ul>
				<label>
					Email
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					Username
					<input
						type="text"
            minLength={6}
            maxLength={30}
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						value={password}
            minLength={6}
            maxLength={30}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					Confirm Password
					<input
						type="password"
            minLength={6}
            maxLength={30}
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
