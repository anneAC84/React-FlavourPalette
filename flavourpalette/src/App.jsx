import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Homepage from './components/Homepage/Homepage';
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

  return (

    <>
     
    <AuthedUserContext.Provider value={{user, setUser}}>
      <NavBar user={user} handleSignout={handleSignout}/>
      <Routes>
        { 
        user ? (
        <>
       
          <Route path="/" element={<Dashboard user={user} />} />
          <Route path="/recipes/new" element={<RecipeForm handleAddRecipe={handleAddRecipe} />} />
          
          </>
        ) : (
         <>
         <Route path="/" element={<Homepage recipes={recipes} />} />
         <Route path="/recipes" element={<RecipeList user={user} />} />
         <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
         
          </>
        )}
        <Route path='/signup' element={<SignupForm setUser={setUser} />} />
        <Route path='/signin' element={<SigninForm setUser={setUser} />} />
      </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
