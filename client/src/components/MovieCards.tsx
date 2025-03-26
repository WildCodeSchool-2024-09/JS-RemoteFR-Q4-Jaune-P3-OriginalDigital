import { Link } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

export default function MovieCards({ movie }: MoviesProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const { role, subscription } = useAuth();

  return (
    <>
      <div className="card-movie-img">
        {role === "anonymous" ? (
          <Link to="/signup" onClick={scrollToTop}>
            <img src={movie.poster} alt={movie.title} />
          </Link>
        ) : movie.premium && !subscription ? (
          <Link to="/payment" onClick={scrollToTop}>
            <img src={movie.poster} alt={movie.title} />
          </Link>
        ) : (
          <Link to={`/movies/${movie.id}`} onClick={scrollToTop}>
            <img src={movie.poster} alt={movie.title} />
          </Link>
        )}
        <p className="movie-title">{movie.title}</p>
      </div>
    </>
  );
}
