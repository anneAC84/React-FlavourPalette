import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App'
import { useContext } from 'react'; 
import './NavBar.css';  // Add this for any specific styling
import ThemeToggle from '../Toggle/ThemeToggle';


const NavBar = ({ handleSignout }) => {

    const {user}= useContext(AuthedUserContext)
    
    
    return (
        <header className="navbar-header">
      <div className="navbar-signature">FlavourPalette</div>
      <nav className="navbar-nav">
       <ul>
        
            { user ? (
            <>
            {user && <ThemeToggle />} {/* Render ThemeToggle only for logged-in users */}
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="" onClick={handleSignout}>Sign Out</Link></li>
            <li><Link to="/recipes/new">New Recipe</Link></li>
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