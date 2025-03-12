import axios from "axios";
import { Bounce, toast } from "react-toastify";

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
    .get(`${API}/api/users`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
    });
};

const editMovie = async (id: number, updatedMovie: MovieType) => {
  try {
    const response = await axios.put(`${API}/api/movies/${id}`, updatedMovie);
    return response;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du film :", error);
    throw error;
  }
};

const createUser = (userData: UserData): Promise<boolean> => {
  const notifySucces = () =>
    toast.success("Votre profil a bien été créé 🚀", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  const notifyError = (
    errorMessage = "Une erreur est survenue lors de l'inscription",
  ) =>
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  return axios.post(`${API}/api/users`, userData).then((response) => {
    if (response.status === 201) {
      notifySucces();
      return true;
    }
    notifyError(response.data.error);
    return false;
  });
};

export { getMovieById, getMovies, getUsers, editMovie, createUser };
