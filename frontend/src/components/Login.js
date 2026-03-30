import { useContext, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const userContext = useContext(UserContext); 

    async function Login(e){
    e.preventDefault();
    setError("");

    try {
        const res = await fetch("http://localhost:3000/users/login", {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        console.log("HTTP status:", res.status);

        const text = await res.text();
        console.log("Raw response:", text);

        let data = {};
        try {
            data = JSON.parse(text);
        } catch (parseErr) {
            console.error("Response is not JSON:", parseErr);
            setError("Backend returned invalid response.");
            return;
        }

        if(data._id !== undefined){
            userContext.setUserContext(data);
        } else {
            setUsername("");
            setPassword("");
            setError(data.message || "Invalid username or password");
        }
    } catch (err) {
        console.error("Network error:", err);
        setError("Backend is not reachable.");
    }
}

    return (
        <div className="form-container">
        <h2 className="form-title">Prijava</h2>
        <form onSubmit={Login}>
          {userContext.user ? <Navigate replace to="/" /> : ""}
          <input type="text" 
                 name="username" 
                 placeholder="Uporabniško ime" 
                 required 
                 className="form-input"
                 value={username} 
                 onChange={(e)=>(setUsername(e.target.value))}
          />
          <input type="password" 
                 name="password" 
                 placeholder="Geslo" 
                 required 
                 className="form-input"
                 value={password} 
                 onChange={(e)=>(setPassword(e.target.value))}
          />
          <div className="tp">
            <input type="submit" 
                   value="Prijava" 
                   className="form-submit"
            />
          </div>
          <label>{error}</label>
        </form>
      </div>
      
    );
}

export default Login;