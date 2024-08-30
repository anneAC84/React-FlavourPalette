import { useState, useEffect } from 'react';
import ImageUpload from '../ImageUpload/ImageUpload';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as recipeService from '../../services/recipeService';
import './RecipeForm.css'
import Sidebar from '../Sidebar/Sidebar'

const RecipeForm = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    picture: 'https://theme-assets.getbento.com/sensei/74ec6d7.sensei/assets/images/catering-item-placeholder-704x520.png',
    description: '',
    ingredients: '',
    method: '',
    cooking_time: '', // Ensure cooking_time is treated as a string
  });
  const [error, setError] = useState('');
  const { recipeId } = useParams();
  const navigate = useNavigate();

  // Function to validate the cooking time format
  const validateTimeFormat = (time) => {
    const regex = /^(\d{2}):(\d{2}):(\d{2})$/;
    return regex.test(time);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'description' && value.length > 100) {
      setError('Description cannot exceed 100 characters.');
    } else if (name === 'cooking_time') {
      if (!validateTimeFormat(value)) {
        setError('Cooking time must be in HH:MM:SS format.');
      } else {
        setError(''); // Clear error if format is valid
      }
    } else {
      setError('');
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (url) => {
    setFormData({ ...formData, picture: url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) {
      return; // Prevent form submission if there's an error
    }

    if (!validateTimeFormat(formData.cooking_time)) {
      setError('Cooking time must be in HH:MM:SS format.');
      return; // Prevent form submission if time format is invalid
    }

    try {
        if (recipeId) {
          await props.handleUpdateRecipe(recipeId, formData); // Update existing recipe
        } else {
          await props.handleAddRecipe(formData); // Add new recipe
        }
        navigate('/recipes'); // Navigate to the recipes page after successful submission
      } catch (error) {
        console.error('Error submitting recipe:', error);
      }
    };

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeData = await recipeService.show(recipeId);
      setFormData(recipeData);
    };
    if (recipeId) fetchRecipe();
  }, [recipeId]);

  return (
    <div className="dashboard-container">
      <Sidebar user={props.user} handleSignout={props.handleSignout} />

      <div className="main-content">
        <main className="recipe-form-container">
          <h1 className="recipe-form-header">{recipeId ? 'Edit Recipe' : 'New Recipe'}</h1>
          <form onSubmit={handleSubmit} className="recipe-form-fields">
            <div className="form-field-wrapper">
              <label htmlFor="title-input" className="recipe-form-label">Title</label>
              <input
                required
                type="text"
                name="title"
                id="title-input"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="image-upload-container">
              <label htmlFor="picture-input">Picture</label>
              <ImageUpload
                name="picture"
                photoImage={formData.picture}
                handleImageUpload={handleImageUpload}
              />
            </div>

            <div className="form-field-wrapper margin-bottom-20">
              <label htmlFor="description-input" className="recipe-form-label">Description</label>
              <textarea
                required
                name="description"
                id="description-input"
                value={formData.description}
                onChange={handleChange}
              />
              {error && <p className="error-message">{error}</p>}
            </div>

            <div className="form-field-wrapper margin-bottom-20">
              <label htmlFor="ingredients-input" className="recipe-form-label">Ingredients</label>
              <textarea
                required
                name="ingredients"
                id="ingredients-input"
                value={formData.ingredients}
                onChange={handleChange}
              />
            </div>

            <div className="form-field-wrapper margin-bottom-20">
              <label htmlFor="method-input" className="recipe-form-label">Method</label>
              <textarea
                required
                name="method"
                id="method-input"
                value={formData.method}
                onChange={handleChange}
              />
            </div>

            <label htmlFor="cooking-time-input" className="recipe-form-label">Cooking Time</label>
            <div className="cooking-time-input-wrapper margin-bottom-20">
              <input
                required
                type="text"
                name="cooking_time"
                id="cooking-time-input"
                value={formData.cooking_time}
                onChange={handleChange}
                className="cooking-time-input"
                placeholder="HH:MM:SS"
              />
              <span className="cooking-time-format">(00:00:00 format)</span>
            </div>

            <div>
              <button type="submit" className="recipe-form-button">Submit</button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default RecipeForm;