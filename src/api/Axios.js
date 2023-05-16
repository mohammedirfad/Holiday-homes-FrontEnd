import Axios from "axios";

const axiosInstance = Axios.create({
  baseURL: "https://holiday-homes-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
    
//     if (error) {
//       // Token expired
//       // Display message to user
//       alert('Token expired. Please log in again.');
//       // Redirect to login page
//       window.location.href = '/home';
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;