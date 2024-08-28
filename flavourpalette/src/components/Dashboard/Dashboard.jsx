import { Link, Routes } from "react-router-dom";
import './Dashboard.css'; // Import the CSS file for styling
import RecipeList from "../RecipeList/RecipeList"; // Import RecipeList

const defaultImage = 'https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/thumbnails/image/placeholder-profile_1.png'; // Your default image URL

const Dashboard = ({ user, handleSignout }) => {
  const profileImage = user.profile_image || defaultImage;

  

  return (
    <div className="dashboard-container">
        <div className="sidebar">
        
        <Link to="/my-recipes" className="sidebar-link">My Recipes</Link>
        <Link to="/recipes"className="sidebar-link">All Recipes</Link>
        <Link to="/recipes/new" className="sidebar-link">Create Recipe</Link>
        <Link to="" onClick={handleSignout}>Log Out</Link>
        </div>
      
        
        <div className="main-content">
        <header className="header">
          <input type="search" placeholder="Search..." className="search-bar"/>
        
        </header>

        <div className="profile-section">
          <img
            src={profileImage}
            alt={`${user.username}'s profile`}
            className="profile-image"
          />
          <h1 className="welcome-text">Welcome back, {user.username}!</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;