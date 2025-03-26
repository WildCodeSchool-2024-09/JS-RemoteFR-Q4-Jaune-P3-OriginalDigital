import argon2 from "argon2";
import jwt from "jsonwebtoken";

import type { RequestHandler } from "express";

import userRepository from "../modules/user/userRepository";

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = await argon2.hash(password, hashingOptions);
    req.body.hashed_password = hashedPassword;
    req.body.password = undefined;
    next();
  } catch (error) {
    next(error);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userRepository.readByEmailWithPassword(email);
    if (!user) {
      res.sendStatus(422);
    }

    const verified = await argon2.verify(user.hashed_password, password);

    if (!verified) {
      res.sendStatus(422);
    } else {
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
        subscription: user.subscription,
      };

      if (!process.env.APP_SECRET) {
        throw new Error(
          "Vous n'avez pas configuré votre APP SECRET dans le .env",
        );
      }

      const token = await jwt.sign(payload, process.env.APP_SECRET, {
        expiresIn: "1y",
      });

      res.cookie("auth", token).json({
        message: "Connexion réussie",
        role: payload.role,
        email: payload.email,
        subscription: payload.subscription,
      });
    }
  } catch (error) {
    next(error);
  }
};

const verify: RequestHandler = async (req, res, next) => {
  if (!process.env.APP_SECRET) {
    throw new Error("Vous n'avez pas configuré votre APP_SECRET dans le .env");
  }
  try {
    const { auth } = req.cookies;
    if (!auth) {
      res.sendStatus(403);
    }

    const resultPayLoad = jwt.verify(auth, process.env.APP_SECRET);
    if (typeof resultPayLoad !== "object") {
      throw new Error("Token invalide");
    }

    req.user = {
      id: resultPayLoad.id,
      email: resultPayLoad.email,
      role: resultPayLoad.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

const checkIfAdmin: RequestHandler = async (req, res, next) => {
  try {
    if (req.user.role === "administrateur") {
      next();
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
};

const checkIfAdminOrUser: RequestHandler = async (req, res, next) => {
  try {
    if (req.user.role === "administrateur" || req.user.role === "utilisateur") {
      next();
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
};

const logout: RequestHandler = async (req, res, next) => {
  try {
    res.clearCookie("auth").send("Déconnexion réussie");
  } catch (error) {
    next(error);
  }
};

const upgradeToPremium: RequestHandler = async (req, res, next) => {
  try {
    const user_id = req.user.id;

    const affectedRows = await userRepository.updatePremium({
      id: user_id,
      subscription: true,
    });

    if (!affectedRows) {
      res.status(400).json({ message: "Mise à jour échouée" });
    }

    const updatedUser = await userRepository.read(user_id);

    if (!updatedUser) {
      res.sendStatus(404);
    } else {
      const payload = {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
        subscription: updatedUser.subscription,
      };

      if (!process.env.APP_SECRET) {
        throw new Error(
          "Vous n'avez pas configuré votre APP SECRET dans le .env",
        );
      }

      const newToken = await jwt.sign(payload, process.env.APP_SECRET, {
        expiresIn: "1y",
      });

      res.cookie("auth", newToken).json({
        message: "Abonnement premium activé",
        role: payload.role,
        email: payload.email,
        subscription: payload.subscription,
      });
    }
  } catch (error) {
    next(error);
  }
};

export default {
  hashPassword,
  login,
  verify,
  checkIfAdmin,
  checkIfAdminOrUser,
  logout,
  upgradeToPremium,
};
