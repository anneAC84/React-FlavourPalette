import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ImageUpload from '../ImageUpload/ImageUpload';
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

  const handleImageUpload = (url) => {
    setFormData({ ...formData, profile_image: url });
};


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
        navigate('/')//should go straight to profile page maybe instead?
        setErrors({});
    } catch (error) {
       setErrors(error);
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
          {errors.username && <span>{errors.username}</span>}
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
          {errors.email && <span>{errors.email}</span>}
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
          {errors.password && <span>{errors.password}</span>}
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
          <ImageUpload
            name="profile_image"
            photoImage={formData.profile_image}
            handleImageUpload={handleImageUpload}
             />
            {errors.profile_image && <span>{errors.profile_image}</span>}
        </div>

        <div>
        {errors.non_field_errors && errors.non_field_errors.length > 0 && errors.non_field_errors.map((error, index) => (
    <p key={index} style={{ color: 'red' }}>{error}</p>
  ))}
        </div>

        <div>
          <button disabled={formData.password !== formData.password_confirmation}>Sign Up</button>
          <Link to="/">
            <button>Cancel</button>
          </Link>
        </div>
      </form>
      {successMessage && <p>{successMessage}</p>}
    
      <p>
        Already have an account? <Link to="/signin">Log in</Link>
      </p>

    </main>
  );
};


  

  export default SignupForm;
