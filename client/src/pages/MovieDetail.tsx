import { useLoaderData } from "react-router-dom";
import "../styles/MoviesDetail.css";
import FavoriteButton from "../components/FavoriteButton";
import MovieCards from "../components/MovieCards";

export default function MovieDetail() {
  const movieData = useLoaderData() as {
    movieId: MovieType;
    movies: MovieType[];
  };

  const movieId = movieData.movieId;
  const movies = movieData.movies;

  const sameGenre = movies
    .filter((movie) =>
      movie.genres.split(",").some((genre) => movieId.genres.includes(genre)),
    )
    .slice(0, 12);

  return (
    <>
      <h1>Original digitals</h1>
      <div className="container-movies">
        <iframe
          className="complete-movie"
          width="100%"
          height="315"
          src={movieId.trailer}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        <h2>{movieId.title}</h2>
        <div className="informations">
          <p>{movieId.release_year}</p>
          <p>{movieId.duration}</p>
        </div>
        <p>{movieId.genres}</p>
        <p>{movieId.production}</p>
        <p>{movieId.casting}</p>
        <div className="bio">
          <p>{movieId.synopsis.slice(0, 50)}...</p>
          <details>
            <summary>
              <p>En savoir plus</p>
            </summary>
            <p>{movieId.synopsis.substring(50)}</p>
          </details>
          <FavoriteButton
            id={movieId.id}
            title={""}
            release_year={0}
            poster={""}
            duration={""}
            synopsis={""}
            trailer={""}
            casting={""}
            production={""}
            landscape_image={""}
            genres={""}
            premium={false}
          />
        </div>
      </div>
      <div className="trailer">
        <h2>Bande annonce</h2>
        <iframe
          className="short-movie"
          width="100%"
          height="315"
          src={movieId.trailer}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <h2 className="same-genre">Vous pourriez aimer aussi...</h2>
      <section className="movie-container">
        {sameGenre.map((movie) => (
          <MovieCards key={movie.id} movie={movie} />
        ))}
      </section>
    </>
  );
}
