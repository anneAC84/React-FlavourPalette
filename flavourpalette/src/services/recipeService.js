const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/recipes/`;

export const index = async () => {
  try {
    const token = localStorage.getItem('access_token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const res = await fetch(BASE_URL, { headers });


    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json(); // Return the parsed JSON response
  } catch (error) {
    console.log('Error fetching recipes:', error);
    throw error; // Rethrow the error to be handled by the component
  }
};


export const show = async (recipeId) => {
    try {
      const token = localStorage.getItem('access_token');// Get the access token if available
      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`; // Include the token in the headers if available
      }
  
      const res = await fetch(`${BASE_URL}${recipeId}/`, {
        headers, // Pass the headers object
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`); // Handle HTTP errors
      }
  
      return res.json();
    } catch (error) {
      console.error(`Error fetching recipe with ID ${recipeId}:`, error);
      throw error; // Rethrow the error to handle it elsewhere
    }
  };


 