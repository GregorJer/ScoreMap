import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';


function Profile(){
    const userContext = useContext(UserContext); 
    const [profile, setProfile] = useState({});

    useEffect(function(){
        const getProfile = async function(){
            const res = await fetch("http://localhost:3000/users/profile", {credentials: "include"});
            const data = await res.json();
            setProfile(data);
        }
        getProfile();
    }, []);

    return (
        <>
            {!userContext.user ? <Navigate replace to="/login" /> : ""}
            <div className="profile-container">
                <h1 className="profile-title fa fa-user-circle"> User profile</h1>
                <p className="profile-item">Username: {profile.username}</p>
                <p className="profile-item">Email: {profile.email}</p>
                <p className="profile-item">Name: {profile.name}</p>
                <p className="profile-item">Surname: {profile.surname}</p>
                <p className="profile-item">Phone Number: {profile.phone_number}</p>
            </div>
        </>
    );
}

export default Profile;
