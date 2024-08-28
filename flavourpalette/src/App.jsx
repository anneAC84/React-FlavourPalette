import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Homepage from './components/Homepage/Homepage'
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm'
import SigninForm from './components/SigninForm/SigninForm'
import RecipeList from './components/RecipeList/RecipeList';
import { signout } from './services/authService';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import * as recipeService from './services/recipeService';
import RecipeForm from './components/RecipeForm/RecipeForm';


export const AuthedUserContext = createContext(null)

const App = () => {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Retrieve token and user data from localStorage on component mount
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      // Assuming userData is a JSON string
      setUser(JSON.parse(userData));
    } else {
      console.log('No token or user data found');
    }
  }, [setUser]);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const recipesData = await recipeService.index();
        setRecipes(recipesData);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        alert('You are not authorized. Please log in again.');
        signout();
            navigate('/signin');
      }
    };

    fetchAllRecipes();
  }, [setRecipes, navigate]); // Run this effect only once, on component mount

  const handleSignout = () => {
    console.log('Handling sign out...');
    signout();
    setUser(null);
    navigate('/')
  };

  const handleAddRecipe = async (recipeFormData) => {
    try {
      const newRecipe = await recipeService.create(recipeFormData);
      setRecipes([newRecipe, ...recipes]);
      navigate('/');
    } catch (error) {
      alert('There was an issue adding your recipe. Please try again.');
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      await recipeService.deleteRecipe(recipeId);
      setRecipes(recipes.filter((recipe) => recipe._id !== recipeId));
      navigate('/recipes');
    } catch (error) {
      console.error('Failed to delete recipe:', error);
    }
  };

  const handleUpdateRecipe = async (recipeId, recipeFormData) => {
    console.log('Updating recipe with ID:', recipeId);
    try {
      const updatedRecipe = await recipeService.update(recipeId, recipeFormData);
      setRecipes(recipes.map((recipe) =>
        recipe._id === recipeId ? updatedRecipe : recipe
      ));
      navigate(`/recipes/${recipeId}`); // Redirect after update
    } catch (error) {
      console.error('Error updating recipe:', error);
      // Optionally, provide user feedback
    }
  };

  return (

    <AuthedUserContext.Provider value={{ user, setUser }}>
    <NavBar user={user} handleSignout={handleSignout} />
    <Routes>
      <Route path="/" element={user ? <Dashboard user={user} /> : <Homepage recipes={recipes} />} />
      <Route path="/recipes" element={<RecipeList user={user} />} />
      <Route path="/recipes/:recipeId" element={<RecipeDetails handleDeleteRecipe={handleDeleteRecipe} />} />
      {user && (
        <>
          <Route path="/recipes/new" element={<RecipeForm handleAddRecipe={handleAddRecipe} />} />
          <Route path="/recipes/:recipeId/edit" element={<RecipeForm handleUpdateRecipe={handleUpdateRecipe} />} />
        </>
      )}
      <Route path="/signup" element={<SignupForm setUser={setUser} />} />
      <Route path="/signin" element={<SigninForm setUser={setUser} />} />
    </Routes>
  </AuthedUserContext.Provider>
);
};

export default App;
