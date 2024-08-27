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
        if (res.status === 404) {
            throw new Error(`Recipe with ID ${recipeId} not found.`);
      }
        throw new Error(`HTTP error! status: ${res.status}`); // Handle HTTP errors
      }
      return res.json();
    } catch (error) {
      console.error(`Error fetching recipe with ID ${recipeId}:`, error);
      throw error; // Rethrow the error to handle it elsewhere
    }
  };

  export const create = async (recipeFormData) => {
    try {
      const token = localStorage.getItem('access_token'); // Get the access token if available
      const headers = {
        Authorization: token ? `Bearer ${token}` : '', // Include the token in the headers if available
        'Content-Type': 'application/json',
      };
  
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(recipeFormData),
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`); // Handle HTTP errors
      }
  
      return res.json(); // Return the parsed JSON response
    } catch (error) {
      console.error('Error creating recipe:', error);
      throw error; // Rethrow the error to handle it elsewhere
    }
  };


  export const deleteRecipe = async (recipeId) => {
    try {
      // Get the token from local storage
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No token found. User is not authenticated.');
      }
  
      // Make the DELETE request using fetch
      const response = await fetch(`${BASE_URL}${recipeId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete recipe with ID ${recipeId}. Status: ${response.status}`);
      }
  
      const isJson = response.headers.get('content-type')?.includes('application/json');
    if (isJson) {
      return await response.json();
    } else {
      return {}; // or null, or true, depending on what you prefer to return
    }
  } catch (error) {
    console.error(`Error deleting recipe with ID ${recipeId}:`, error);
    throw error;
  }
};


export async function update(recipeId, recipeFormData) {
    try {
      const token = localStorage.getItem('access_token');
      const url = `${BASE_URL}${recipeId}/`; // Ensure URL ends with a slash
      console.log('Request URL:', url);
  
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeFormData),
      });
  
      console.log('Response status:', res.status);
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      return res.json();
    } catch (error) {
      console.error('Error updating recipe:', error);
      throw error;
    }
  }