import { useState, createContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Homepage from './components/Homepage/Homepage';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm'
import SigninForm from './components/SigninForm/SigninForm'
import RecipeList from './components/RecipeList/RecipeList';
import { signout } from './services/authService';

export const AuthedUserContext = createContext(null)

const App = () => {
  const [user, setUser] = useState(null);

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
  }, []);

  const handleSignout = () => {
    console.log('Handling sign out...');
    signout();
    setUser(null);
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
          </>
        ) : (
         <>
          <Route path="/" element={<Homepage />} />
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
