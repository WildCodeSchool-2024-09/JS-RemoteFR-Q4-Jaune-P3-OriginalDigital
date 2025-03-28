import { Link, useLoaderData } from "react-router-dom";
import MovieCards from "../components/MovieCards";
import "../styles/catalogue.css";
import { useAuth } from "../services/AuthContext";

export default function Catalogue() {
  const { movies, favorite } = useLoaderData() as {
    movies: MovieType[];
    favorite: MovieType[];
  };

  const { subscription } = useAuth();
  const freeMovies = movies.filter((movie) => !movie.premium);
  const premiumMovies = movies.filter((movie) => movie.premium);
  const sfMovies = movies.filter((movie) =>
    movie.genres.includes("Science-fiction"),
  );
  return (
    <>
      <div className="first-container">
        <img
          src="/Background_connection.jpg"
          className="img-container"
          alt=""
        />
        {!subscription && (
          <button type="button" className="decouvrir-nos-offres">
            <a href="#acces">Découvrir nos offres</a>
          </button>
        )}
      </div>
      <div className="show-movies">
        <h2>Films gratuits</h2>
        <section className="movie-container">
          {freeMovies.map((movie) => (
            <MovieCards key={movie.id} movie={movie} />
          ))}
        </section>
        <h2>Tendances Actuelles</h2>
        <section className="movie-container">
          {sfMovies.map((movie) => (
            <MovieCards key={movie.id} movie={movie} />
          ))}
        </section>
        <h2>Films Premium</h2>
        <section className="movie-container">
          {premiumMovies.map((movie) => (
            <MovieCards key={movie.id} movie={movie} />
          ))}
        </section>
        <h2>Ma Liste</h2>
        <section className="movie-container">
          {favorite.map((movie) => (
            <MovieCards key={movie.id} movie={movie} />
          ))}
        </section>
      </div>
      {!subscription && (
        <section id="acces" className="connection-bottom">
          <h2>Nos différentes souscriptions</h2>
          <div className="bottom-container">
            <div className="bottom-left">
              <h3>Offre Gratuite</h3>
              <p>Visionnez 4 films par mois</p>
              <p className="bottom-free">Accédez à notre catalogue complet</p>
              <p className="bottom-free">Regardez en haute qualité</p>
              <p className="bottom-free">Gérez vos listes de films à voir</p>
            </div>

            <div className="bottom-right">
              <h3>Offre Premium</h3>
              <p>Films illimités en haute qualité</p>
              <p>Accédez à notre catalogue complet</p>
              <p>Regardez en haute qualité</p>
              <p>Gérez vos listes de films à voir</p>
            </div>
          </div>
          <Link to="/payment">
            <button type="button" className="button-premium">
              Devenir Premium
            </button>
          </Link>
        </section>
      )}
    </>
  );
}
