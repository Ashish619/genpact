

export const axiosConfig = () => ({
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json"
});

const baseUrl = 'https://reqres.in';

// API Endpoints
export const getUserDetails = id => {
  return `${baseUrl}/api/users/${id}`;
};

