import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as recipeService from '../../services/recipeService';
import './Homepage.css';
import Carousel from '../Carousel/Carousel';

const Homepage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesData = await recipeService.index();
        setRecipes(recipesData);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);
  
  return (
    <div className="homepage-container">
      

      <div className="homepage-hero">
        <h1>Unlock the magic of cooking with our recipes app!</h1>
      </div>

      <section className="homepage-recipes">
        <h2>Featured Recipes</h2>
        <div className="recipes-grid">
          {recipes.slice(0, 8).map((recipe) => (
            <div className="recipe-card" key={recipe.id}>
              <img src={recipe.picture} alt={recipe.title} className="recipe-image" />
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <Link to={`/recipes/${recipe.id}`} className="btn-primary">View Recipe</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="homepage-carousel">
        <h2>More Recipes</h2>
        <Carousel items={recipes} />
      </section>
    </div>
  );
};

export default Homepage;