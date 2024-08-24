import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import * as authService from '../../services/authService'
import { signup } from '../../services/authService';

const SignupForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email:'',
    password: '',
    password_confirmation: '',
    profile_image: '',
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
        const response = await signup(formData);
        setSuccessMessage('Sign up successful!');
        setErrors({});
    } catch (error) {
        // Set the error messages for each field
        const newErrors = {};
        if (error.email) {
            newErrors.email = error.email;
        }
        if (error.username) {
            newErrors.username = error.username;
        }
        setErrors(newErrors);
    }
};


  //const isFormInvalid = () => {
    //const { username, email, password, passwordConfirm } = formData;
    //return !(username && email && password && password === passwordConfirm);
  //};
  


    return (
    <main>
      <h1>Sign Up</h1>
       {message && <p style={{ color: 'red' }}>{message}</p>}
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
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            required
          />
          {errors.email && <p>{errors.email}</p>}
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
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="password_confirmation">Confirm Password:</label>
          <input
            type="password"
            id="password_confirmation"
            value={formData.password_confirmation}
            name="password_confirmation"
            onChange={handleChange}
            required
          />
          {errors.password_confirmation && <p>{errors.password_confirmation}</p>}
        </div>
        <div>
          
          <label htmlFor="profilePicture">profile picture:</label>
             <input
            type="text"
            name="profile_image"
            value={formData.profile_image}
            onChange={handleChange}
             />
        </div>

        <div>
          <button disabled={formData.password !== formData.password_confirmation}>Sign Up</button>
          <Link to="/">
            <button>Cancel</button>
          </Link>
        </div>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errors.general && <p>{errors.general}</p>}
      <p>
        Already have an account? <Link to="/signin">Log in</Link>
      </p>

    </main>
  );
};


  

  export default SignupForm;
