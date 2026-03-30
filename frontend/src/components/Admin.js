import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from "../userContext";

const Admin = () => {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [search, setSearch] = useState('');

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');

    // New state for table visibility
    const [tableVisible, setTableVisible] = useState(true);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:3000/users');
            setUsers(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!user || !user.admin) {
            return;
        }

        fetchUsers();
    }, [user, search]);

    if (!user || !user.admin) {
        return <div>You are not authorized to view this page</div>;
    }

    const filteredUsers = users.filter(u => u.username.toLowerCase().includes(search.toLowerCase()));

    const handleEditClick = (user) => {
        setTableVisible(false); // Hide table

        setSelectedUser(user);
        setName(user.name);
        setSurname(user.surname);
        setEmail(user.email);
        setUsername(user.username);
        setPhoneNumber(user.phone_number);
        setPassword("");
        setError('');
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const updatedUser = {
            name,
            surname,
            email,
            username,
            password,
            phone_number: phoneNumber
        };

        try {
            await axios.put(`http://localhost:3000/users/${selectedUser._id}`, updatedUser);

            // Reset the form fields and selectedUser state
            setName('');
            setSurname('');
            setEmail('');
            setPassword('');
            setUsername('');
            setPhoneNumber('');
            setSelectedUser(null);

            // Fetch the updated user list
            fetchUsers();

            setTableVisible(true); // Show table
        } catch (error) {
            console.error(error);
            setError('Error updating user.');
        }
    };

    return (
        <div className='content-container'>
            <input
                type="text"
                className='filter-users'
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search users by username"
            />
            {tableVisible && (
               <table id="users-table" className='statistics-table'>
               <thead>
                   <tr>
                       <th className="table-header">Username</th>
                       <th className="table-header" >Name</th>
                       <th className="table-header">Surname</th>
                       <th className="table-header" >Email</th>
                       <th className="table-header">Played Matches</th>


                   </tr>
               </thead>
               <tbody>
               {filteredUsers.map(u => (
                   <tr className="statistics-row" key={u._id}>
                       <td>{u.username}</td>
                       <td>{u.name}</td>
                       <td>{u.surname}</td>
                       <td>{u.email}</td>
                       <td><button className='show' onClick={() => handleEditClick(u)}>Edit</button></td>
                   </tr>
               ))}
               </tbody>
           </table>
            )}
            {selectedUser && (
                <div id="user-edit-form" className="form-container">
                <h2 className="form-title">Edit User</h2>
                <form onSubmit={handleFormSubmit}>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        required
                        className="form-input"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <label>Surname</label>
                    <input
                        type="text"
                        name="surname"
                        placeholder="Surname"
                        required
                        className="form-input"
                        value={surname}
                        onChange={e => setSurname(e.target.value)}
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-input"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="E-mail"
                        required
                        className="form-input"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        className="form-input"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />

                    <label>Phone Number</label>
                    <input
                        type="text"
                        name="phone_number"
                        placeholder="Phone Number"
                        required
                        className="form-input"
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                    />

                    <input type="submit" value="Update" className="form-submit" />
                    <label>{error}</label>
                </form>
            </div>
            )}
            <br></br>
        </div>
        
    );
};

export default Admin;
