import "./App.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import UserCard from "./Components/UserCard";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NativeSelect from "@mui/material/NativeSelect";

function App() {
	const [members, setMembers] = useState([]);
	const [sort, setSort] = useState("created_at");
	const [order, setOrder] = useState("")

	let navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`http://localhost:8000/members/?sort_param=${order}${sort}`)
			.then((res) => {
				console.log(res);
				setMembers(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [sort, order]);

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
			<div className="sort-box">
				<span> Sort By </span>
				<Box sx={{ minWidth: 100 }}>
					<FormControl fullWidth>
						<NativeSelect
						    value={sort}
							onChange={(e) => setSort(e.target.value)}
						>
							<option value={"created_at"}>Created at</option>
							<option value={"last_name"}>Last name</option>
						</NativeSelect>
					</FormControl>
				</Box>
				<Box sx={{ minWidth: 130 }}>
					<FormControl fullWidth>
						<NativeSelect
						    value={order}
							onChange={(e) => setOrder(e.target.value)}
						>
							<option value={"-"}>Descending</option>
							<option value={""}>Ascending</option>
						</NativeSelect>
					</FormControl>
				</Box>
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
