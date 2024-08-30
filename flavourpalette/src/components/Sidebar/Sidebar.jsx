import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faPlusCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const defaultImage = 'https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/thumbnails/image/placeholder-profile_1.png'; 

const Sidebar = ({ user = {}, handleSignout }) => {
  const profileImage = user.profile_image || defaultImage;
  
  return (
    <div className="sidebar">
      <div className="profile-section">
        <img
          src={profileImage}
          alt={`${user.username || 'User'}'s profile`}
          className="profile-image"
        />
        <div>
          <h2>{user.username || 'Username'}</h2>
          <p>{user.email || 'Email'}</p>
        </div>
      </div>

      <Link to="/my-recipes" className="sidebar-link"> 
        <FontAwesomeIcon icon={faUtensils} className="fa-icon" /> My Recipes
      </Link>
      <Link to="/recipes" className="sidebar-link">
        <FontAwesomeIcon icon={faUtensils} className="fa-icon" /> All Recipes
      </Link>
      <Link to="/recipes/new" className="sidebar-link">
        <FontAwesomeIcon icon={faPlusCircle} className="fa-icon" /> Create Recipe
      </Link>
      
      <Link to="" onClick={handleSignout} className="logout-link">
        <FontAwesomeIcon icon={faSignOutAlt} className="fa-icon" /> Log Out
      </Link>
    </div>
  );
};

export default Sidebar;