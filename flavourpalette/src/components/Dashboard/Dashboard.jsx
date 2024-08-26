import { Link } from 'react-router-dom';


const Dashboard = ({ user }) => {

    

    return (
      <main>
        <h1>Welcome, {user.username}</h1>
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