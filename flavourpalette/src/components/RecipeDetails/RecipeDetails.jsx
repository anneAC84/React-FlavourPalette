
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import * as recipeService from '../../services/recipeService';
import { AuthedUserContext } from '../../App';
import { Link } from 'react-router-dom';

const RecipeDetails = (props) => {

const [recipe, setRecipe] = useState(null);
const { user } = useContext(AuthedUserContext);

    const { recipeId } = useParams();
    console.log('recipeId', recipeId);

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
      
      // Verify that hoot state is being set correctly:
      console.log('recipe state:', recipe);
      console.log('user state:', user);

      if (!recipe && recipeId !== 'new') return <main>Loading...</main>;

      if (recipe && user) {
        console.log('Recipe created_by ID:', recipe.created_by.id);
        console.log('User ID:', user.id);
      }

      return (
    <main>
      {recipeId === 'new' ? (
        <div>
          <h1>Create a New Recipe</h1>
          {/* Render form or message for creating a new recipe */}
        </div>
      ) : (
        recipe && (
        <div>
          <header>
            <img src={recipe.picture} alt={recipe.title} style={{ width: '100%', height: 'auto' }} />
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            <p>
              Created by {recipe.created_by.username} on{' '}
              {new Date(recipe.created_at).toLocaleDateString()}
            </p>
            <p>Cooking time: {formatDuration(recipe.cooking_time)}</p>
          </header>
          <section>
            <h2>Ingredients</h2>
            <p>{recipe.ingredients}</p>
          </section>
          <section>
            <h2>Method</h2>
            <p>{recipe.method}</p>
          </section>
          <section>
            <h2>Comments</h2>
            {/* Placeholder for comments section */}
          </section>
        </div>
        )
         )}

{recipe && recipe.created_by.id === user.id && (

    <>
      <Link to={`/recipes/${recipeId}/edit`}>Edit</Link>
      <button onClick={() => props.handleDeleteRecipe(recipeId)}>Delete</button>
    </>
  )}
    </main>
  );
};

const formatDuration = (duration) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  return `${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
};

export default RecipeDetails;