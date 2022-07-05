import "./AddUser.scss";
import React from "react";
import { useLocation } from "react-router-dom";
import UserInput from "./UserInput";

export default function AddUser() {
	const location = useLocation();

	return (
		<div className="add-user">
			<div className="header">
				<h2> Add User </h2>
				<span> Set a user's name, email, phone, and role </span>
			</div>
			<UserInput userInfo={location.state.userData} />
		</div>
	);
}
