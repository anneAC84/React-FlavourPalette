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


 