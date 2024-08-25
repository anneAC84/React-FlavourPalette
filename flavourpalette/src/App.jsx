import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Homepage from './components/Homepage/Homepage';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm'
import SigninForm from './components/SigninForm/SigninForm'

const App = () => {
  const [user, setUser] = useState(null);

  console.log(localStorage.getItem('token'))

  return (
    <>
      <NavBar user={user} />
      <Routes>
        { 
        user ? (
          
          <Route path="/" element={<Dashboard user={user} />} />
        ) : (
          <Route path="/" element={<Homepage />} />
        )}
        <Route path='/signup' element={<SignupForm setUser={setUser} />} />
        <Route path='/signin' element={<SigninForm setUser={setUser} />} />
      </Routes>
    </>
  );
};

export default App;
