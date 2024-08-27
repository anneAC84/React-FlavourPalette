import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App'
import { useContext } from 'react'; 
import './NavBar.css';  // Add this for any specific styling

const NavBar = ({ handleSignout }) => {

    const {user}= useContext(AuthedUserContext)
    
    
    return (
        <header className="navbar-header">
      <div className="navbar-signature">FlavourPalette</div>
      <nav className="navbar-nav">
       <ul>
        
            { user ? (
            <>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="" onClick={handleSignout}>Sign Out</Link></li>
            <li><Link to="/recipes/new">NEW RECIPE</Link></li>
            </>
        ) : (
            <>
            <nav className="homepage-nav">
          <Link to="/recipes">Recipes</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
          <Link to="/">Home</Link>
        </nav>
              </>
             )}
            </ul>
          </nav>
          </header>
        )
    }
  
  export default NavBar;