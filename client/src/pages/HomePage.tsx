import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import MovieCards from "../components/MovieCards";
import "../styles/homepage.css";

export default function HomePage() {
  const [selectedOffer, setSelectedOffer] = useState("free");
  const movies = useLoaderData() as MovieType[];
  const freeMovies = movies.filter((movie) => !movie.premium);
  return (
    <section className="all-element">
      <section className="top-element">
        <h1>L’original au service du digital</h1>
        <p>
          Profitez d'un catalogue qui contient le meilleur du cinéma. Saisissez
          votre adresse e-mail pour nous rejoindre.
        </p>
        <div className="input-mail">
          <img src="/image-homepage.png" alt="" />
        </div>
        <img src="/arrow-down.png" alt="" className="arrow" />
        <h2>Tendances Actuelles</h2>
        <section className="movie-container">
          {freeMovies.map((movie) => (
            <MovieCards key={movie.id} movie={movie} />
          ))}
        </section>
      </section>
      <section className="middle-element">
        <h2>Nos différentes souscriptions</h2>
        <div className="offer">
          <button
            type="button"
            className={`button ${selectedOffer === "free" ? "active" : "inactive"}`}
            onClick={() => setSelectedOffer("free")}
          >
            Gratuit
          </button>
          <button
            type="button"
            className={`button ${selectedOffer === "premium" ? "active" : "inactive"}`}
            onClick={() => setSelectedOffer("premium")}
          >
            Premium
          </button>
        </div>
        <div className="content">
          {selectedOffer === "free" ? (
            <div className="free">
              <p>Visionnez 4 films par mois</p>
              <p className="disabled">Accédez à notre catalogue complet</p>
              <p className="disabled">Regardez en haute qualité</p>
              <p className="disabled">Gérez vos listes de films à voir</p>
            </div>
          ) : (
            <div className="premium">
              <p>Films illimités en haute qualité</p>
              <p>Accédez à notre catalogue complet</p>
              <p>Regardez en haute qualité</p>
              <p>Gérez vos listes de films à voir</p>
            </div>
          )}
          <button type="button" className="button-middle">
            <Link to="/signup">Nous rejoindre</Link>
          </button>
        </div>
      </section>
      <div className="bottom-element">
        <h2>N'attendez plus!</h2>
        <Link to="/">Se connecter</Link>
      </div>
    </section>
  );
}
