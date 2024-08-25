import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ImageUpload from '../ImageUpload/ImageUpload';
import { signup } from '../../services/authService'
import { AuthedUserContext } from '../../App';

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
        navigate('/');  // Redirect to the dashboard
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

    
    const dataToSubmit = { ...formData };
    if (!dataToSubmit.profile_image) {
        dataToSubmit.profile_image = placeholderImageUrl;
    }

    try {
        const data = await signup(formData);
        setSuccessMessage('Signup successful! Redirecting to your dashboard...');
        setUser(data.user);
        setRedirect(true);    
      } catch (error) {
        console.log("Error caught:", error);

        if (error.response) {  // Access the attached response data
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
  

    return (
    <main>
      <h1>Sign Up</h1>
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            name="email"
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
          <label htmlFor="password_confirmation">Confirm Password:</label>
          <input
            type="password"
            id="password_confirmation"
            value={formData.password_confirmation}
            name="password_confirmation"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          
          <label htmlFor="profilePicture">profile picture:</label>
          <ImageUpload
            name="profile_image"
            photoImage={formData.profile_image}
            handleImageUpload={handleImageUpload}
             />   
        </div>
         <div>
          <button disabled={formData.password !== formData.password_confirmation}>Sign Up</button>
          <Link to="/">
            <button>Cancel</button>
          </Link>
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </form>
      <p>
        Already have an account? <Link to="/signin">Log in</Link>
      </p>

    </main>
  );
};


  

  export default SignupForm;
