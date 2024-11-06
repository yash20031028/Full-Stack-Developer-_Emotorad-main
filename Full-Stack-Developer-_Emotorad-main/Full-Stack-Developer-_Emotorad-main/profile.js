import React from 'react';
import './Profile.css';

const Profile = ({ user }) => (
    <div className="profile">
        <h2>User Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
    </div>
);

export default Profile;
