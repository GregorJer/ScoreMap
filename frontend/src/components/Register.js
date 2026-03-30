import { useState } from 'react';

function Register() {
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const [email, setEmail] = useState([]);
    const [error, setError] = useState([]);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");


    async function Register(e) {
        e.preventDefault();
        const res = await fetch("http://localhost:3000/users", {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password,
                name: name,
                surname: surname,
                repeat_password: repeatPassword,
                phone_number: phoneNumber
            })
        });
        const data = await res.json();
        if (data._id !== undefined) {
            window.location.href = "/";
        }
    
        else {
            setUsername("");
            setPassword("");
            setEmail("");
            setName("");
            setError("Registration failed");
        }
    }

    return (
        <div className="form-container">
            <h2 className="form-title">Registracija</h2>
            <form onSubmit={Register}>
                <label>Ime</label>
                <input type="text" name="name" placeholder="Name" required className="form-input"
                    onChange={(e) => setName(e.target.value)} />

                <label>Priimek</label>
                <input type="text" name="surname" placeholder="Surname" required className="form-input"
                    onChange={(e) => setSurname(e.target.value)} />

                <label>Email</label>
                <input type="text" name="email" placeholder="E-mail" required className="form-input" value={email}
                    onChange={(e) => setEmail(e.target.value)} />

                <label>Uporabniško ime</label>
                <input type="text" name="username" placeholder="Username" required className="form-input" value={username}
                    onChange={(e) => setUsername(e.target.value)} />

                <label>Geslo</label>
                <input type="password" name="password" placeholder="Password" required className="form-input" value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                <label>Ponovi geslo</label>
                <input type="password" name="repeat_password" placeholder="Repeat password" required className="form-input"
                    onChange={(e) => setRepeatPassword(e.target.value)} />

                <label>Telefonska številka</label>
                <input type="text" name="phone_number" placeholder="Phone Number" required className="form-input"
                    onChange={(e) => setPhoneNumber(e.target.value)} />

                <input type="submit" value="REGISTER" className="form-submit" />
                <label>{error}</label>
            </form>
        </div>
    );

}

export default Register;