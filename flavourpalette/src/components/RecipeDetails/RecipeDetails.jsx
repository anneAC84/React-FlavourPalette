
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as recipeService from '../../services/recipeService';

const RecipeDetails = (props) => {

const [recipe, setRecipe] = useState(null);

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

      if (!recipe && recipeId !== 'new') return <main>Loading...</main>;


      return (
    <main>
      {recipeId === 'new' ? (
        <div>
          <h1>Create a New Recipe</h1>
          {/* Render form or message for creating a new recipe */}
        </div>
      ) : (
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