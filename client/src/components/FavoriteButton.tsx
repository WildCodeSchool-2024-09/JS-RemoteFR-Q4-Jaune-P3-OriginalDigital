import axios from "axios";
import { useState } from "react";
import "../styles/favorite.css";

export default function FavoriteButton({ movieId }: MovieDetailsProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const API = import.meta.env.VITE_API_URL;

  const handleToggleFavorite = () => {
    axios
      .post(
        `${API}/api/users/watchlist`,
        { movie_id: movieId.id },
        { withCredentials: true },
      )
      .then((response) => response.data)
      .catch((error) => console.error(error));
    setIsFavorite((prev) => !prev);
  };

  const handleToggleDeleteFavorite = () => {
    axios
      .delete(`${API}/api/users/watchlist`, {
        data: { movie_id: movieId.id },
        withCredentials: true,
      })
      .then((response) => response.data)
      .catch((error) => console.error(error));
    setIsFavorite((prev) => !prev);
  };

  return (
    <button
      type="button"
      className={`favorite-button ${isFavorite ? "active" : ""}`}
      onClick={!isFavorite ? handleToggleFavorite : handleToggleDeleteFavorite}
      aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      <span className="favorite-icon">{isFavorite ? "★" : "☆"}</span>
      <span className="button-text">
        {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      </span>
    </button>
  );
}
