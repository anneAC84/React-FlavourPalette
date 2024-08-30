const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/recipes/`;

export const index = async () => {
  try {
    const token = localStorage.getItem('access_token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const res = await fetch(BASE_URL, { headers });


    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json(); 
  } catch (error) {
    console.log('Error fetching recipes:', error);
    throw error; 
  }
};


export const show = async (recipeId) => {
    try {
      const token = localStorage.getItem('access_token');
      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`; 
      }
  
      const res = await fetch(`${BASE_URL}${recipeId}/`, {
        headers, 
      });
  
      if (!res.ok) {
        if (res.status === 404) {
            throw new Error(`Recipe with ID ${recipeId} not found.`);
      }
        throw new Error(`HTTP error! status: ${res.status}`); 
      }
      return res.json();
    } catch (error) {
      console.error(`Error fetching recipe with ID ${recipeId}:`, error);
      throw error; 
    }
  };

  export const create = async (recipeFormData) => {
    try {
      const token = localStorage.getItem('access_token'); 
      const headers = {
        Authorization: token ? `Bearer ${token}` : '', 
        'Content-Type': 'application/json',
      };
  
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(recipeFormData),
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`); 
      }
  
      return res.json(); 
    } catch (error) {
      console.error('Error creating recipe:', error);
      throw error; 
    }
  };


  export const deleteRecipe = async (recipeId) => {
    try {
      
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No token found. User is not authenticated.');
      }
  
      
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
      return {}; 
    }
  } catch (error) {
    console.error(`Error deleting recipe with ID ${recipeId}:`, error);
    throw error;
  }
};


export async function update(recipeId, recipeFormData) {
    try {
      const token = localStorage.getItem('access_token');
      const url = `${BASE_URL}${recipeId}/`; 
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


  