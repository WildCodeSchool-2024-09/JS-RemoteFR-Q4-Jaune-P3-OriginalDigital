import express from "express";
import auth from "./middlewares/auth";
import form from "./middlewares/form";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
import movieActions from "./modules/movie/movieActions";

router.get("/api/movies", movieActions.browse);
router.get("/api/movies/:id", movieActions.read);
router.post("/api/movies", form.validate, movieActions.add);
router.put("/api/movies/:id", movieActions.edit);
router.delete("/api/movies/:id", movieActions.destroy);

/* ************************************************************************ */

import formSignup from "./middlewares/formSignup";
import hashPassword from "./middlewares/hashPassword";
import userAction from "./modules/user/userAction";

router.get("/api/users", userAction.browse);

router.get("/api/users/:id", userAction.read);
router.post(
  "/api/users",
  formSignup.validate,
  auth.hashPassword,
  userAction.add,
);
router.post("/api/login", auth.login);
router.put("/api/users/:id", userAction.edit);
router.delete("/api/users/:id", userAction.destroy);

/* ************************************************************************ */

export default router;
