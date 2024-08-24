const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL



const signup = async (formData) => {
    try {
      const res = await fetch(`${BACKEND_URL}/auth/sign-up/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!res.ok) {
        console.log('Response from backend:', json);
        throw json;
        
      }
      localStorage.setItem('token', json.token);
      return json;
    } catch (error) {
      console.log(error);
      throw error;
    }

}
  
  export {
    signup,
  };