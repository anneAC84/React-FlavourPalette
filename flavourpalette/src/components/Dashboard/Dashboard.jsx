import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './Dashboard.css';



const Dashboard = ({ user, handleSignout }) => {
  

  

  return (
    <div className="dashboard-container">
       <Sidebar user={user} handleSignout={handleSignout} />


        <div className="main-content">
        <header className="header">
          
          
        </header>

        <div className="profile-section">
          <h1 className="welcome-text">Welcome back, {user.username}!</h1>
        </div>

        <div className="widget">
          <h3>Recent Activities</h3>
          <ul>
            <li>Viewed Chocolate Cake Recipe</li>
            <li>Created New Pasta Dish</li>
            <li>Saved Recipe: Apple Pie</li>
          </ul>
        </div>

        <div className="widget">
          <h3>Tips for You</h3>
          <p>Try experimenting with new ingredients to enhance your recipes!</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;