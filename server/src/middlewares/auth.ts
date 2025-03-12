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
    console.info(user);
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
      };

      if (!process.env.APP_SECRET) {
        throw new Error(
          "Vous n'avez pas configuré votre APP SECRET dans le .env",
        );
      }

      const token = await jwt.sign(payload, process.env.APP_SECRET, {
        expiresIn: "1y",
      });

      res.cookie("auth", token);
      res.send(`${user.role}`);
    }
  } catch (error) {
    next(error);
  }
};

export default { hashPassword, login };
