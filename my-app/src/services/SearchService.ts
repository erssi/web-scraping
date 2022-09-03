// import { ApiService } from "./apiService"

export const searchService = async (search: string) => {
  try {
    const response = await fetch(
      `http://localhost:3001/shopping/search?search=${search}`,
      {
        method: 'GET',
        headers: {
          'access-control-allow-origin': '*',
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
