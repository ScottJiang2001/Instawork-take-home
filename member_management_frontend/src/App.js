import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react'
import axios from "axios";


function App() {
  const [members, setMembers] = useState('')

  const newMember = {
    id: 10,
    first_name:"bob",
    last_name: "joe",
    user_email: "joegolghsdfsdfjghjghd@gmail.com",
    user_phone: "3242345",
    user_role: "REG"
  }

  const handleSubmit = () => {
    axios
      .get("http://localhost:8000/api/team_management/")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
  }
  const handleCreate = () => {
    axios
      .post("http://localhost:8000/api/team_management/", newMember)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
  }


  return (
    <div className="App">
      <header className="App-header">
          <button onClick={handleSubmit}> click here! </button>
          <button onClick={handleCreate}> CREATE! </button>
          <div>
            {members}
          </div>
      </header>
    </div>
  );
}

export default App;
