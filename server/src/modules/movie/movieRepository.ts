import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";
type Movie = {
  id: number;
  title: string;
  synopsis: string;
  release_year: string;
  duration: string;
  poster: string;
  trailer: string;
};

class MovieRepository {
  async create(movie: Omit<Movie, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into movie (title, synopsis, release_year, duration, poster, trailer) values (?, ?, ?, ?, ?, ?)",
      [
        movie.title,
        movie.synopsis,
        movie.release_year,
        movie.duration,
        movie.poster,
        movie.trailer,
      ],
    );

    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from movie where id = ?",
      [id],
    );

    return rows[0] as Movie;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from movie");
    return rows as Movie[];
  }
}

export default new MovieRepository();
