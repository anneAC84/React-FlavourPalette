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
            <main className="recipe-list-container">
                <h1>Recipe List</h1>
                
            </main>
        );
    }

    return (
        <main className="recipe-list-container">
            <h1 className="recipe-list-title"> All Recipes </h1>
            <div className="recipes-grid">
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <div className="recipe-card" key={recipe.id}>
                            <Link to={`/recipes/${recipe.id}`} className="recipe-link">
                                <img src={recipe.picture} alt={recipe.title} className="recipe-image" />
                                <div className="recipe-info">
                                    <h3 className="recipe-title">{recipe.title}</h3>
                                    <p className="recipe-description">{recipe.description}</p>
                                    {recipe.created_by && <p className="recipe-creator">Created by: {recipe.created_by.username}</p>}
                                </div>
                            </Link>
                            {user && (
                                <button className="bookmark-button" onClick={() => console.log(`Bookmarking recipe with id: ${recipe.id}`)}>
                                    <i className="fas fa-bookmark"></i>
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No recipes found.</p>
                )}
            </div>
        </main>
    );
};

export default RecipeList;