import "./App.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import UserCard from "./Components/UserCard";

function App() {
	const [members, setMembers] = useState([]);
	let navigate = useNavigate();

	useEffect(() => {
		axios
			.get("http://localhost:8000/members/")
			.then((res) => {
				console.log(res.data);
				setMembers(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleAddNavigate = () => {
		const userData = {
			first_name: "",
			last_name: "",
			user_email: "",
			user_phone: "",
			user_role: "",
		};

		navigate("/adduser", { state: { userData: userData } });
	};

	return (
		<div className="App">
			<div className="header">
				<div className="header-description">
					<h1> Team Members </h1>
					<span>
						{" "}
						You have <b>{members.length}</b>{" "}
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
			{members.length > 0 ? (
				<div className="user-list">
					{members.map((member) => (
						<UserCard userData={member} />
					))}
				</div>
			) : (
				<div className="empty-screen">Click "+ ADD" to add a team member</div>
			)}
		</div>
	);
}

export default App;
