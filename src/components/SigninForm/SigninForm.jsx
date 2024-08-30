import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import { AuthedUserContext } from '../../App';
import './SigninForm.css';

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
  setErrorMessage('');
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = await authService.signin(formData);
    setUser(data.user);
    
    navigate('/'); 
  } catch (error) {
    setErrorMessage(error.message); 
  }
};

  const isFormInvalid = () => {
    const { username, password } = formData;
    return !(username && password);
  };

  return (
  <main>
    <div className="signin-form-container">
    <div className="signin-form-wrapper">
    <h1 className="signin-form-header">Sign In</h1>
     {errorMessage && <p className="error-message">{errorMessage}</p>}
    <form onSubmit={handleSubmit} className="signin-form-fields">
    <div className="form-field-wrapper">
        <label htmlFor="username" className="signin-form-label">Username:</label>
        <input
          type="text"
          id="name"
          value={formData.username}
          name="username"
          onChange={handleChange}
          className="signin-form-input"
          required
          
        />
        
      </div>
      
      <div className="form-field-wrapper">
        <label htmlFor="password" className="signin-form-label">Password:</label>
        <input
          type="password"
          id="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
          className="signin-form-input"
          required
        />
      
      </div>      
      <div className="form-field-wrapper">
        <button type="submit" className="signin-form-button" disabled={isFormInvalid()}>Sign In</button>
        <Link to="/" className="signin-form-link">
          <button>Cancel</button>
        </Link>
      </div>
    </form>
    
    
    </div>
    <Link to="/signup" className="signin-form-link">
  Do not have an account? Sign up
</Link>
</div>
  </main>
);
};

export default SigninForm

