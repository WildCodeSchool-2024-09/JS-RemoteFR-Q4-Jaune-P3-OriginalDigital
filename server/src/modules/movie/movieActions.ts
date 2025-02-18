import type { RequestHandler } from "express";
import movieRepository from "./movieRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const movies = await movieRepository.readAll();
    res.json(movies);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const movieId = Number(req.params.id);
    const movie = await movieRepository.read(movieId);
    if (movie == null) {
      res.sendStatus(404);
    } else {
      res.json(movie);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read };
