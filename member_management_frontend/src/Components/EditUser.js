import {useLocation} from 'react-router-dom';
import axios from "axios";
import { Link, useNavigate, Route } from "react-router-dom";


export default function EditUser(props) {
    const location = useLocation()
    const navigate = useNavigate()

    const handleDelete = (userId) => {
		axios
			.delete(`http://localhost:8000/api/team_management/${userId}/`)
			.then((res) => navigate("/"))
			.catch((err) => console.log(err));
	};

    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Edit User</h2>
        <span> {location.state.id} </span>
        <button onClick={() => handleDelete(location.state.id)}> delete </button>
      </main>
    );
  }