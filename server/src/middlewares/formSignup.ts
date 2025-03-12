import type { RequestHandler } from "express";
import Joi from "joi";
import hashPassword from "./hashPassword";

const signupSchema = Joi.object({
  first_name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Prénom : le champ est obligatoire",
    "string.min": "Prénom : minumum 3 characters",
    "string.max": "Prénom : maximum 50 characters",
  }),
  last_name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Nom : le champ est obligatoire",
    "string.min": "Nom : minumum 3 characters",
    "string.max": "Nom : maximum 50 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "email : le champ est obligatoire",
    "string.email": "email incorrect",
  }),
  password: Joi.string().min(8).max(50).required().messages({
    "string.empty": "Mot de passe : le champ est obligatoire",
    "string.min": "Le mot de passe doit contenir minumum 8 characters",
    "string.max": "le mot de passe peut contenir maximum 50 characters",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Les mots de passe ne correspondent pas",
    "string.empty": "Le champ est obligatoire",
  }),
});

const validate: RequestHandler = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if (error) {
    res.json({ error: error.details[0].message });
  } else {
    next();
  }
};

export default { validate };
