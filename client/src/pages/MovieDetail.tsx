import { useLoaderData } from "react-router-dom";
import "../styles/MoviesDetail.css";
import FavoriteButton from "../components/FavoriteButton";
export default function MovieDetail() {
  const movie = useLoaderData() as MovieType;
  return (
    <>
      <h1>Original digitals</h1>
      <div className="container-movies">
        <iframe
          className="complete-movie"
          width="100%"
          height="315"
          src={movie.trailer}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        <h2>{movie.title}</h2>
        <div className="informations">
          <p>{movie.release_year}</p>
          <p>{movie.duration}</p>
        </div>
        <div className="bio">
          <p>{movie.synopsis.slice(0, 50)}...</p>
          <details>
            <summary>
              <p>En savoir plus</p>
            </summary>
            <p>{movie.synopsis.substring(50)}</p>
          </details>
          <FavoriteButton
            id={movie.id}
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
          src={movie.trailer}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <section>
        <h2 className="same-genre">Films du même genre</h2>
        <p>{movie.genres}</p>
      </section>
    </>
  );
}
