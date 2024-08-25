const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL



export const signup = async (formData) => {
    try {
      const res = await fetch(`${BACKEND_URL}/auth/sign-up/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!res.ok) {
        console.log('Response from backend:', json);
        
        const error = new Error('Signup failed');
        error.response = json;
        throw error;
    }

    localStorage.setItem('token', json.token);
    return json;
} catch (error) {
    console.error('Error in signup:', error);
    
    // Re-throw the error for the calling function to handle it
     throw error;
   }
}
  
  
export const signin = async (formData) => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/sign-in/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

    
  
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
  
      const data = await response.json();
      console.log('Signin Response:', data);

    // Save the token to localStorage or cookies
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);

    // Save user data if needed
    localStorage.setItem('user', JSON.stringify(data.user));

    return data;
  } catch (error) {
    console.error('Signin error:', error.message);
    throw error;
  }
};

export const signout = () => {
    console.log('Signing out...');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  };