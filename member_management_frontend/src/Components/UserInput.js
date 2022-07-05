import "./UserInput.scss";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserInput({ userInfo }) {
	const [firstName, setFirstName] = useState(userInfo.first_name);
	const [lastName, setLastName] = useState(userInfo.last_name);
	const [email, setEmail] = useState(userInfo.user_email);
	const [phone, setPhone] = useState(userInfo.user_phone);
	const [role, setRole] = useState(userInfo.user_role);

	const navigate = useNavigate();

	const handleSubmit = (userInfo) => {
		const currentUserInfo = {
			first_name: firstName,
			last_name: lastName,
			user_email: email,
			user_phone: phone,
			user_role: role,
		};

		if (userInfo.id) {
			axios
				.put(
					`http://localhost:8000/api/team_management/${userInfo.id}/`,
					currentUserInfo
				)
				.then((res) => navigate("/"))
				.catch((err) => console.log(err));
		} else {
			axios
				.post(`http://localhost:8000/api/team_management/`, currentUserInfo)
				.then((res) => navigate("/"))
				.catch((err) => console.log(err));
		}
	};

	const handleDelete = (userId) => {
		axios
			.delete(`http://localhost:8000/api/team_management/${userId}/`)
			.then((res) => navigate("/"))
			.catch((err) => console.log(err));
	};

	return (
		<div className="user-input">
			<h3> User Info </h3>
			<TextField
				id="outlined-basic"
				label="First Name"
				variant="outlined"
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
			/>
			<TextField
				id="outlined-basic"
				label="Last Name"
				variant="outlined"
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
			/>
			<TextField
				id="outlined-basic"
				label="Email"
				variant="outlined"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<TextField
				id="outlined-basic"
				label="Phone Number"
				variant="outlined"
				value={phone}
				onChange={(e) => setPhone(e.target.value)}
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
		</div>
	);
}
