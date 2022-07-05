import "./UserCard.scss";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserCard({ userData }) {
	const navigate = useNavigate();

	const handleEditNavigate = (user) => {
		const userData = {
			id: user.id,
			first_name: user.first_name,
			last_name: user.last_name,
			user_email: user.user_email,
			user_phone: user.user_phone,
			user_role: user.user_role,
		};

		navigate("/edituser", { state: { userData: userData } });
	};

	return (
		<div className="user-card" onClick={() => handleEditNavigate(userData)}>
			<div className="user-avatar" />
			<div className="user-info">
				<span>
					{" "}
					<b>
						{userData.first_name} {userData.last_name}{" "}
						{userData.user_role === "ADM" && "(Admin)"}
					</b>
				</span>
				<span> {userData.user_phone} </span>
				<span> {userData.user_email} </span>
			</div>
		</div>
	);
}
