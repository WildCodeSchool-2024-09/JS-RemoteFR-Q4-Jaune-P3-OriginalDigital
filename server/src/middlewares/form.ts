import type { RequestHandler } from "express";
import Joi from "joi";

const movieSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(50)
    .messages({
      "string.min": "Le titre doit contenir au moins 2 caractère",
      "string.max": "Le titre doit contenir au maximum 50 caractères",
    })
    .required(),
  release_year: Joi.number().min(1900).required().messages({
    "number.min": "l'année de sortie est invalide",
  }),
  synopsis: Joi.string().min(10).max(500).required().messages({
    "string.min": "le synopsis doit contenir au moins 10 caractères",
    "string.max": "le synopsis doit contenir au maximum 500 caractères",
  }),
  duration: Joi.number().integer().min(6).max(6).required().messages({
    "number.max": "la durée doit être au format 00:00:00",
    "number.min": "la durée doit être au format 00:00:00",
  }),
  production: Joi.string().min(5).max(100).required().messages({
    "string.min": "la production doit contenir au moins 5 caractères",
    "string.max": "la production doit contenir au maximum 50 caractères",
  }),
  casting: Joi.string().min(5).max(100).required().messages({
    "string.min": "le casting doit contenir au moins 5 caractères",
    "string.max": "le casting doit contenir au maximum 50 caractères",
  }),
  poster: Joi.string().min(10).max(255).required().messages({
    "string.base": "le poster doit être une URL",
    "string.min": "le poster doit contenir au minimun 10 caractères",
    "string.max": "le poster doit contenir au maximum 255 caractères",
  }),
  trailer: Joi.string().min(10).max(255).required().messages({
    "string.base": "le trailer doit être un lien vers une vidéo",
    "string.min": "le trailer doit contenir au minimun 10 caractères",
    "string.max": "le trailer doit contenir au maximum 255 caractères",
  }),
  landscape_image: Joi.string().min(10).max(255).required().messages({
    "string.base": "l'image de fond doit être au format paysage en URL",
    "string.min":
      "l'URL de l'image de fond doit contenir au minimun 10 caractères",
    "string.max":
      "l'URL de l'image de fond doit contenir au maximum 255 caractères",
  }),
});

const validate: RequestHandler = async (req, res, next) => {
  const { error } = movieSchema.validate(req.body);
  if (error) {
    res.json({ error: error.details[0].message });
  } else {
    next();
  }
};
export default { validate };
