import React, { useState, useEffect } from 'react';
import * as recipeService from '../../services/recipeService'
import '../RecipeList/RecipeList.css'
import { Link } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar';

const MyRecipes = ({ user }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        console.log('Fetching recipes for user:', user); 
        const allRecipes = await recipeService.index(); 
        console.log('Fetched all recipes:', allRecipes); 
        
        if (user) {
          
          const userRecipes = allRecipes.filter(recipe => 
            recipe.created_by.id === user.id 
          );
          console.log('User recipes:', userRecipes);
          setRecipes(userRecipes);
        }
      } catch (error) {
        console.error('Error fetching my recipes:', error);
      }
    };

    if (user) {
      fetchUserRecipes();
    }
  }, [user]);

  return (
    <div className="dashboard-container">
      <Sidebar user={user} handleSignout={() => {/* Add signout logic here */}} />

      <div className="main-content">
        <h1 className="recipe-list-title">My Recipes</h1>
        {recipes.length === 0 ? (
          <p>You have no recipes yet.</p>
        ) : (
          <div className="recipes-grid">
            {recipes.map(recipe => (
              <div key={recipe.id} className="recipe-card">
                <Link to={`/recipes/${recipe.id}`} className="recipe-link">
                <img src={recipe.picture} alt={recipe.title} className="recipe-image" />
                <div className="recipe-info">
                  <h3 className="recipe-title">{recipe.title}</h3>
                  <p className="recipe-description">{recipe.description}</p>
                </div>
                <div className="recipe-creator">Created by you</div>
                <button className="bookmark-button">⭐</button>
                </Link>
              </div>
              
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRecipes;

