import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import { AuthedUserContext } from '../../App';

const SigninForm = () => {
const navigate = useNavigate();
const [errorMessage, setErrorMessage] = useState('');
const { setUser } = useContext(AuthedUserContext);
const [formData, setFormData] = useState({

  username: '',
  password: ''
  
});



const handleChange = (e) => {
  setFormData({
      ...formData,
      [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = await authService.signin(formData); // Call the signin function
    setUser(data.user);
    // Redirect or update state to reflect the user is logged in
    navigate('/');  // Assuming you have a dashboard route
  } catch (error) {
    setErrorMessage(error.message); // Display the error message
  }
};

  const isFormInvalid = () => {
    const { username, password } = formData;
    return !(username && password);
  };

  return (
  <main>
    <h1>Sign In</h1>
     {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="name"
          value={formData.username}
          name="username"
          onChange={handleChange}
          required
          
        />
        
      </div>
      
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
          required
        />
      
      </div>      
      <div>
        <button type="submit" disabled={isFormInvalid()}>Sign In</button>
        <Link to="/">
          <button>Cancel</button>
        </Link>
      </div>
    </form>
    
    <p>
      Do not have an account? <Link to="/signup">Sign Up</Link>
    </p>

  </main>
);
};

export default SigninForm