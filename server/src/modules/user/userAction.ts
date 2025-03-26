import type { RequestHandler } from "express";
import userRepository from "./userRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await userRepository.readAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const user = await userRepository.read(userId);
    if (!user) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      hashedPassword: req.body.hashed_password,
      subscription: req.body.subscription,
      role: req.body.role,
    };
    const insertId = await userRepository.create(user);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const user = {
      id: Number(req.params.id),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      hashedPassword: req.body.hashed_password,
      subscription: req.body.subscription,
      role: req.body.role,
    };
    const affectedRows = await userRepository.update(user);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    await userRepository.delete(userId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const destroyWatchlistUser: RequestHandler = async (req, res, next) => {
  try {
    const deleteMovie = {
      user_id: req.user.id,
      movie_id: req.body.movie_id,
    };
    await userRepository.deleteMovieToUserWatchlist(deleteMovie);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const readWatchlistUser: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.user.id);
    const user = await userRepository.read(id);
    const watchlist = await userRepository.readWatchlistByUser(id);
    res.json({ user: user, watchlist: watchlist });
  } catch (error) {
    next(error);
  }
};

const addWatchlist: RequestHandler = async (req, res, next) => {
  try {
    const watchlist = {
      movie_id: req.body.movie_id,
      user_id: req.user.id,
    };
    const id = Number(req.user.id);
    const user = await userRepository.read(id);
    const watchlistId = await userRepository.addMovieToUserWatchlist(watchlist);
    res.status(201).json({ user: user, watchlist: watchlistId });
  } catch (err) {
    next(err);
  }
};

const sendSuccessStatus: RequestHandler = async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const editPremium: RequestHandler = async (req, res, next) => {
  try {
    const subscription = {
      id: req.user.id,
      subscription: req.body.subscription,
    };
    const affectedRows = await userRepository.updatePremium(subscription);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
};

export default {
  browse,
  read,
  add,
  destroy,
  edit,
  readWatchlistUser,
  addWatchlist,
  sendSuccessStatus,
  destroyWatchlistUser,
  editPremium,
};
