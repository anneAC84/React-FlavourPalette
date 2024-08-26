import { useState } from 'react';
import ImageUpload from '../ImageUpload/ImageUpload';
import { useNavigate } from 'react-router-dom';

const RecipeForm = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    picture: 'https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/thumbnails/image/placeholder-profile_1.png',
    description: '',
    ingredients: '',
    method: '',
    cooking_time: '', // This will be in a format that matches the Django DurationField
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (url) => {
    setFormData({ ...formData, picture: url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await props.handleAddRecipe(formData); // Ensure this function is properly defined
        navigate('/recipes'); // Navigate to a new page after successful submission
      } catch (error) {
        console.error('Error adding recipe:', error);
      }
    };

  return (
    <main>
      <h1>Create Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title-input">Title</label>
          <input
            required
            type="text"
            name="title"
            id="title-input"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="picture-input">Picture</label>
          <ImageUpload
            name="picture"
            photoImage={formData.picture}
            handleImageUpload={handleImageUpload}
          />
        </div>

        <div>
          <label htmlFor="description-input">Description</label>
          <textarea
            required
            name="description"
            id="description-input"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="ingredients-input">Ingredients</label>
          <textarea
            required
            name="ingredients"
            id="ingredients-input"
            value={formData.ingredients}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="method-input">Method</label>
          <textarea
            required
            name="method"
            id="method-input"
            value={formData.method}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="cooking-time-input">Cooking Time (ISO 8601 duration format)</label>
          <input
            required
            type="text"
            name="cooking_time"
            id="cooking-time-input"
            value={formData.cooking_time}
            onChange={handleChange}
          />
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </main>
  );
};

export default RecipeForm;