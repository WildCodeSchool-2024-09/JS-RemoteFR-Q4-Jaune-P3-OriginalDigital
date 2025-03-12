import axios from "axios";
import { useState } from "react";
import "../styles/formdashboard.css";
import joi from "joi";

export default function FormDashBoard() {
  const [newMovie, setNewMovie] = useState({
    title: "",
    poster: "",
    release_year: "",
    synopsis: "",
    duration: "",
    trailer: "",
    casting: "",
    production: "",
    landscape_image: "",
  });

  const API = import.meta.env.VITE_API_URL;
  const sendForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`${API}/api/movies/`, newMovie)
      .then((response) => {
        if (response.status === 201) {
          console.info("Film ajouté dans la base de données");
        } else {
          alert(response.data.error);
        }
      })
      .catch((error) => {
        if (joi.isError(error)) {
          console.error(error);
        }
      });
  };

  const handleChangeMovieForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
  };
  console.info(newMovie);
  return (
    <form onSubmit={sendForm} className="form-dashboard">
      <p>Titre</p>
      <input
        type="text"
        name="title"
        value={newMovie.title}
        onChange={handleChangeMovieForm}
        placeholder="Titre du film"
      />
      <p>Affiche</p>
      <input
        type="text"
        name="poster"
        onChange={handleChangeMovieForm}
        id=""
        placeholder="URL"
      />
      <p>Date de sortie</p>
      <input
        type="number"
        name="release_year"
        onChange={handleChangeMovieForm}
        placeholder="AAAA"
      />
      <p>Synopsis</p>
      <input
        type="text"
        name="synopsis"
        onChange={handleChangeMovieForm}
        placeholder="Synopsis"
      />
      <p>Durée</p>
      <input
        type="text"
        name="duration"
        onChange={handleChangeMovieForm}
        placeholder="0:00:00"
      />
      <p>Bandes annonces</p>
      <input
        type="text"
        name="trailer"
        onChange={handleChangeMovieForm}
        placeholder="URL"
      />
      <p>Casting</p>
      <input
        type="text"
        name="casting"
        onChange={handleChangeMovieForm}
        placeholder="Nom/prénoms acteurs"
      />
      <p>Production</p>
      <input
        type="text"
        name="production"
        onChange={handleChangeMovieForm}
        placeholder="Noms/prénoms réalisateur"
      />
      <p>Landscape</p>
      <input
        type="text"
        name="landscape_image"
        onChange={handleChangeMovieForm}
        placeholder="Landscape"
      />
      <input type="submit" className="submit-form" />
    </form>
  );
}
