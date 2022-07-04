import "./AddUser.scss";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, Route } from "react-router-dom";

export default function AddUser() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [role, setRole] = useState("");

	const navigate = useNavigate();

	const handleSubmit = () => {
		const newMember = {
			first_name: firstName,
			last_name: lastName,
			user_email: email,
			user_phone: phone,
			user_role: role,
		};

		axios
			.post("http://localhost:8000/api/team_management/", newMember)
			.then((res) => navigate("/"))
			.catch((err) => console.log(err));
	};

	return (
		<div className="App">
			<div className="header">
				<h2> Add User </h2>
				<span> Set a user's name, email, phone, and role </span>
			</div>
			<h3> User Info</h3>
			<TextField
				id="outlined-basic"
				label="First Name"
				variant="outlined"
				onChange={(e) => setFirstName(e.target.value)}
			/>
			<TextField
				id="outlined-basic"
				label="Last Name"
				variant="outlined"
				onChange={(e) => setLastName(e.target.value)}
			/>
			<TextField
				id="outlined-basic"
				label="Email"
				variant="outlined"
				onChange={(e) => setEmail(e.target.value)}
			/>
			<TextField
				id="outlined-basic"
				label="Phone Number"
				variant="outlined"
				onChange={(e) => setPhone(e.target.value)}
			/>
			<h3> User Role </h3>
			<FormControl>
				<RadioGroup
					aria-labelledby="demo-radio-buttons-group-label"
					defaultValue="REG"
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
			<Button variant="contained" onClick={handleSubmit}>
				Add Member
			</Button>
		</div>
	);
}
