import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App'
import { useContext } from 'react'; 

const NavBar = ({ handleSignout }) => {

    const {user}= useContext(AuthedUserContext)
    return (
    
        
          <nav>
            <ul>
            { user ? (
            <>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="" onClick={handleSignout}>Sign Out</Link></li>
            <li><Link to="/recipes/new">NEW RECIPE</Link></li>
            </>
        ) : (
            <>
              <li><Link to="/signin">Sign In</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/recipes">Recipes</Link></li>
              </>
             )}
            </ul>
          </nav>
        )
    }
  
  export default NavBar;