import "./EditUser.scss";
import { useLocation } from "react-router-dom";
import UserInput from "./UserInput";
import React from "react";

export default function EditUser() {
	const location = useLocation();

	return (
		<div className="edit-user">
			<div className="header">
				<h2> Edit User </h2>
				<span> Edit a user's name, email, phone, and role </span>
			</div>
			<UserInput userInfo={location.state.userData} />
		</div>
	);
}
