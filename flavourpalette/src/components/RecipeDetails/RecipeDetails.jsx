
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import * as recipeService from '../../services/recipeService';
import { AuthedUserContext } from '../../App';
import { Link } from 'react-router-dom';
import './RecipeDetails.css'

const RecipeDetails = (props) => {
    const [recipe, setRecipe] = useState(null);
    const user = useContext(AuthedUserContext);
  
    const { recipeId } = useParams();
    console.log('recipeId:', recipeId);
  
    useEffect(() => {
      if (recipeId !== 'new') {
        const fetchRecipe = async () => {
          try {
            const recipeData = await recipeService.show(recipeId);
            setRecipe(recipeData);
          } catch (error) {
            console.error('Error fetching recipe:', error);
          }
        };
  
        fetchRecipe();
      }
    }, [recipeId]);
  
    // Debugging logs to verify user and recipe data
    console.log('recipe state:', recipe);
    console.log('user state:', user);
  
    if (!recipe && recipeId !== 'new') return <main>Loading...</main>;
  
    if (recipe && user) {
      console.log('Recipe created_by ID:', recipe.created_by.id);
      console.log('User ID:', user.id);
    }
    
      
      return (
        <div className="recipe-details-container">
          {recipeId === 'new' ? (
            <div>
              <h1>Create a New Recipe</h1>
              {/* Render form or message for creating a new recipe */}
            </div>
          ) : (
            recipe && (
              <>
                <div className="recipe-details-header">
                  <img
                    src={recipe.picture}
                    alt={recipe.title}
                    className="recipe-details-image"
                  />
                  <div className="recipe-details-info">
                    <h1 className="recipe-details-title">{recipe.title}</h1>
                    <p className="recipe-details-description">{recipe.description}</p>
                    <p className="recipe-details-meta">
                      Created by {recipe.created_by.username} on{' '}
                      {new Date(recipe.created_at).toLocaleDateString()}
                    </p>
                    <p className="recipe-details-meta">
                      Cooking time: {formatDuration(recipe.cooking_time)}
                    </p>
                  </div>
                </div>
                <div className="recipe-details-content">
                  <section className="recipe-details-section">
                    <h2>Ingredients</h2>
                    <p>{recipe.ingredients}</p>
                  </section>
                  <section className="recipe-details-section">
                    <h2>Method</h2>
                    <p>{recipe.method}</p>
                  </section>
                  <section className="recipe-details-section">
                    <h2>Comments</h2>
                    {/* Placeholder for comments section */}
                  </section>
                </div>
                {recipe && user?.user?.id === recipe.created_by.id &&  (
                  <div className="recipe-details-actions">
                    <Link
                      to={`/recipes/${recipeId}/edit`}
                      className="recipe-details-edit-button"
                    >
                      Edit
                    </Link>
                    <button
                      className="recipe-details-delete-button"
                      onClick={() => props.handleDeleteRecipe(recipeId)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            )
          )}
        </div>
      );
    };
    

const formatDuration = (duration) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  return `${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
};

export default RecipeDetails;