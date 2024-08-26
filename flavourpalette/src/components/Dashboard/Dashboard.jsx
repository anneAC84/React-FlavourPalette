import { Link } from 'react-router-dom';
const defaultImage = 'https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/thumbnails/image/placeholder-profile_1.png'; // Your default image URL

const Dashboard = ({ user }) => {
    const profileImage = user.profile_image || defaultImage;
    

    return (
      <main>
        <h1>Welcome, {user.username}</h1>
       {/* Display the profile picture */}
       {user.profile_image && (
        <div>
          <img
            src={user.profile_image}
            alt={`${user.username}'s profile`}
            style={{ width: '150px', height: '150px', borderRadius: '50%' }} // Example styling
          />
        </div>
      )}
        <p>Here are your options:</p>
      {/* Add other dashboard content here */}

      {/* Add a link to the Recipe List */}
      <Link to="/recipes">
        <button>View All Recipes</button>
      </Link>
      </main>
    );
  };
  
  export default Dashboard;