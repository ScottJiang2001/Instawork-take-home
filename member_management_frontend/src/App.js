import logo from "./logo.svg";
import "./App.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, Route } from "react-router-dom";
import userAvatar from "./user-avatar.svg";
import IconButton from "@mui/material/IconButton";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

function App() {
	const [members, setMembers] = useState([]);
	let navigate = useNavigate();

	const newMember = {
		// id: 15,
		first_name: "Bob",
		last_name: "Jones",
		user_email: "sdfsfsdfddsdfsdfdssdfsdfsdffssdfsdfdfdffdf@gmail.com",
		user_phone: "3242345",
		user_role: "ADM",
	};

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/team_management/")
			.then((res) => {
				console.log(res.data);
				setMembers(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleCreate = () => {
		axios
			.post("http://localhost:8000/api/team_management/", newMember)
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err));
	};

	const handleNavigate = (userId) => {
		navigate("/edituser", { state: { id: userId } });
	};

	const handleAddNavigate = () => {
		navigate("/adduser");
	};

	return (
		<div className="App">
			<button onClick={handleCreate}> CREATE! </button>
			<div className="header">
				<div className="header-description">
					<h1> Team Members </h1>
					<span>
						{" "}
						You have {members.length}{" "}
						{members.length === 1 ? "member" : "members"}
					</span>
				</div>
				<div className="header-add">
					<Button
						variant="contained"
						startIcon={<AddIcon />}
						onClick={handleAddNavigate}
					>
						Add
					</Button>
				</div>
			</div>
			{members.map((member) => (
				<div className="user-card" onClick={() => handleNavigate(member.id)}>
					<div className="user-avatar" />
					<div className="user-info">
						<span>
							{" "}
							<b>
								{member.first_name} {member.last_name}{" "}
								{member.user_role === "ADM" && "(Admin)"}
							</b>
						</span>
						<span> {member.user_phone} </span>
						<span> {member.user_email} </span>
					</div>
				</div>
			))}
			: <div> </div>
		</div>
	);
}

export default App;
