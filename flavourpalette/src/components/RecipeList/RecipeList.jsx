import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as recipeService from '../../services/recipeService';
import { Link } from 'react-router-dom'

const RecipeList = ({ user }) => {
    const [recipes, setRecipes] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const recipesData = await recipeService.index(); // Fetch recipes
                setRecipes(recipesData);
            } catch (error) {
                console.error('Error fetching recipes:', error);
                if (error.message.includes('401')) {
                    setIsAuthorized(false);
                    navigate('/signin');  // Redirect to login page if unauthorized
                }
            }
        };

        fetchRecipes();
    }, [navigate]);

    if (!isAuthorized) {
        return (
            <main>
                <h1>Recipe List</h1>
                <p>You are not authorized to view the recipes. Please <a href="/signin">log in</a>.</p>
            </main>
        );
    }

    return (
        <main>
            <h1>Recipe List</h1>
            <ul>
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <div key={recipe.id}>
                            <Link to={`/recipes/${recipe.id}`}>
                            <h3>{recipe.title}</h3>
                            <img src={recipe.picture} alt={recipe.title} style={{ width: '100px' }} />
                            <p>{recipe.description}</p>
                            {recipe.created_by && <p>Created by: {recipe.created_by.username}</p>}
                            </Link>
                            
                            {user && (
                                <button onClick={() => console.log(`Bookmarking recipe with id: ${recipe.id}`)}>
                                    Bookmark
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No recipes found.</p>
                )}
            </ul>
        </main>
    );
};

export default RecipeList;