import "./UserInput.scss";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validator from "validator";

export default function UserInput({ userInfo }) {
	const [firstName, setFirstName] = useState(userInfo.first_name);
	const [lastName, setLastName] = useState(userInfo.last_name);
	const [email, setEmail] = useState(userInfo.user_email);
	const [phone, setPhone] = useState(userInfo.user_phone);
	const [role, setRole] = useState(userInfo.id ? userInfo.user_role : "REG");
	const [firstNameError, setFirstNameError] = useState(false);
	const [lastNameError, setLastNameError] = useState(false);
	const [phoneError, setPhoneError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [fieldError, setError] = useState(false);
	const [serverError, setServerError] = useState({});
	const [errorArray, setErrorArray] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		handleServerError();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [serverError]);

	const handleServerError = () => {
		let tempArray = [];

		for (const key in serverError) {
			console.log(serverError[key][0]);
			tempArray.push(serverError[key][0]);
		}

		setErrorArray(tempArray);
	};

	const validateEmail = (email) => {
		if (!validator.isEmail(email)) {
			setEmailError(true);
		} else {
			setEmailError(false);
		}
	};

	const handleSubmit = (userInfo) => {
		setError(false);

		if (!firstName) {
			setFirstNameError(true);
		}
		if (!lastName) {
			setLastNameError(true);
		}
		if (!phone) {
			setPhoneError(true);
		}
		if (!email) {
			setEmailError(true);
		}

		if (firstName && lastName && phone && !emailError) {
			const currentUserInfo = {
				first_name: firstName,
				last_name: lastName,
				user_email: email,
				user_phone: phone,
				user_role: role,
			};

			if (userInfo.id) {
				axios
					.put(`http://localhost:8000/member/${userInfo.id}/`, currentUserInfo)
					.then((res) => navigate("/"))
					.catch((err) => console.log(err));
				return;
			}
			axios
				.post(`http://localhost:8000/members/`, currentUserInfo)
				.then((res) => navigate("/"))
				.catch((err) => {
					console.log(err.response.data.user_email);
					setServerError(err.response.data);
				});
		} else {
			setError(true);

			setTimeout(() => {
				setError(false);
			}, 2000);
		}
	};

	const handleDelete = (userId) => {
		axios
			.delete(`http://localhost:8000/member/${userId}/`)
			.then((res) => navigate("/"))
			.catch((err) => console.log(err));
	};

	return (
		<div className="user-input">
			<form autoComplete="off">
				<h3> User Info </h3>
				<TextField
					id="outlined-basic"
					label="First Name"
					variant="outlined"
					value={firstName}
					onChange={(e) => {
						setFirstName(e.target.value);
						setFirstNameError(false);
					}}
					required
					error={firstNameError}
				/>
				<TextField
					id="outlined-basic"
					label="Last Name"
					variant="outlined"
					value={lastName}
					onChange={(e) => {
						setLastName(e.target.value);
						setLastNameError(false);
					}}
					required
					error={lastNameError}
				/>
				<TextField
					id="outlined-basic"
					label="Email"
					variant="outlined"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
						validateEmail(e.target.value);
					}}
					required
					error={emailError}
				/>
				<span className="error">
					{emailError && email.length > 0 && "Please enter a valid email"}
				</span>
				<TextField
					id="outlined-basic"
					label="Phone Number"
					variant="outlined"
					value={phone}
					onChange={(e) => {
						setPhone(e.target.value);
						setPhoneError(false);
					}}
					required
					error={phoneError}
				/>
				<h3> User Role </h3>
				<FormControl>
					<RadioGroup
						aria-labelledby="demo-radio-buttons-group-label"
						defaultValue={role}
						name="radio-buttons-group"
						onChange={(e) => setRole(e.target.value)}
					>
						<FormControlLabel
							value="REG"
							control={<Radio />}
							label="Regular - Can't delete members"
						/>
						<FormControlLabel
							value="ADM"
							control={<Radio />}
							label="Admin - Can delete members"
						/>
					</RadioGroup>
				</FormControl>
				<div className="buttons">
					{userInfo.id && (
						<Button
							variant="outlined"
							color="error"
							onClick={() => handleDelete(userInfo.id)}
						>
							Delete
						</Button>
					)}
					<Button variant="contained" onClick={() => handleSubmit(userInfo)}>
						Save
					</Button>
				</div>
			</form>
			<div className="error-messages">
				{fieldError && (
					<span> Ensure that all fields are filled and correct </span>
				)}
				<div>
					{errorArray.map((error, index) => (
						<span>
							{" "}
							{index + 1}.{error}{" "}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
