import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const getMovies = () => {
  return axios
    .get(`${API}/api/movies`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};
const getMovieById = (id: number) => {
  return axios
    .get(`${API}/api/movies/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
    });
};

const getUsers = () => {
  return axios
    .get(`${API}/api/users`, { withCredentials: true })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
    });
};

export { getMovieById, getMovies, getUsers };
