import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ImageUpload from '../ImageUpload/ImageUpload';
import { signup } from '../../services/authService'
import { AuthedUserContext } from '../../App';
import './SignupForm.css';

const SignupForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { setUser } = useContext(AuthedUserContext);
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const placeholderImageUrl = 'https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/thumbnails/image/placeholder-profile_1.png'
  const [formData, setFormData] = useState({
    username: '',
    email:'',
    password: '',
    password_confirmation: '',
    profile_image: placeholderImageUrl,
  });

  useEffect(() => {
    if (redirect) {
      setTimeout(() => {
        navigate('/signin'); 
      }, 2000);
    }
  }, [redirect, navigate]);

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
    setErrorMessage('');
    setSuccessMessage('');

    if (formData.password !== formData.password_confirmation) {
      setErrorMessage('Passwords do not match');
      return;
    }
    
    const dataToSubmit = { ...formData };
    if (!dataToSubmit.profile_image) {
        dataToSubmit.profile_image = placeholderImageUrl;
    }

    try {
        const data = await signup(dataToSubmit);
        setSuccessMessage('Signup successful! Redirecting to the Log in page...');
        setUser(data.user);
        setRedirect(true);    
      } catch (error) {
        console.log("Error caught:", error);

        if (error.response) { 
            const errors = error.response;

          const messages = [];
          if (errors.username) messages.push(`Username: ${errors.username[0]}`);
          if (errors.email) messages.push(`Email: ${errors.email[0]}`);
          if (errors.password) messages.push(`Password: ${errors.password[0]}`);
          if (errors.non_field_errors) messages.push(errors.non_field_errors[0]);
            
            const message = messages.join('\n');   
            setErrorMessage(message);
          } else {
            setErrorMessage('Signup failed. Please try again.');
          }
        }
      };

      const isFormInvalid = () => {
        const { username, email, password, password_confirmation } = formData;
        return !(username && email && password && password_confirmation);
      };
  

    return (
    <main>
        <div className="signup-form-container">
        <h1 className="signup-form-header">Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form-fields">
      <div className="form-field-wrapper">
          <label htmlFor="username" className="signup-form-label">Username:</label>
          <input
            type="text"
            id="name"
            value={formData.username}
            name="username"
            onChange={handleChange}
            className="signup-form-input"
            required
            
          />
        </div>
        <div className="form-field-wrapper">
          <label htmlFor="email" className="signup-form-label">Email:</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            className="signup-form-input"
            required
          />
        </div>
        <div className="form-field-wrapper">
          <label htmlFor="password" className="signup-form-label">Password:</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field-wrapper">
          <label htmlFor="password_confirmation" className="signup-form-label">Confirm Password:</label>
          <input
            type="password"
            id="password_confirmation"
            value={formData.password_confirmation}
            name="password_confirmation"
            onChange={handleChange}
            className="signup-form-input"
            required
          />
        </div>
        <div className="form-field-wrapper image-upload-container">
          
          <label htmlFor="profilePicture" className="signup-form-label">profile picture:</label>
          <ImageUpload
            name="profile_image"
            photoImage={formData.profile_image}
            handleImageUpload={handleImageUpload}
             />   
        </div>
        <div className="form-field-wrapper">
          <button
           type="submit"
           className={`signup-form-button ${isFormInvalid() ? 'disabled' : ''}`}
           disabled={isFormInvalid()}
         >Sign Up</button>
          <Link to="/" className="signin-form-link">
          <button>Cancel</button>
        </Link>
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </form>
      <Link className="signup-form-link">
        Already have an account? <Link to="/signin">Sign in</Link>
      </Link>
     </div>
    </main>
  );
};


  

  export default SignupForm;
