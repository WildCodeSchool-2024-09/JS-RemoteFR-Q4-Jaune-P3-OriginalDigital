import express from "express";
import auth from "./middlewares/auth";
import form from "./middlewares/form";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
import movieActions from "./modules/movie/movieActions";

router.get("/api/movies", movieActions.browse);
router.get("/api/movies/:id", auth.verify, movieActions.read);

router.post("/api/movies", auth.verify, auth.checkIfAdmin, movieActions.add);
router.post("/api/movies", form.validate, auth.checkIfAdmin, movieActions.add);

router.put(
  "/api/movies/:id",
  auth.verify,
  auth.checkIfAdmin,
  movieActions.edit,
);

router.delete(
  "/api/movies/:id",
  auth.verify,
  auth.checkIfAdmin,
  movieActions.destroy,
);

/* ************************************************************************ */

import formSignup from "./middlewares/formSignup";
import userAction from "./modules/user/userAction";

router.get("/api/users", auth.verify, auth.checkIfAdmin, userAction.browse);
router.get("/api/users/watchlist", auth.verify, userAction.readWatchlistUser);
router.get("/api/users/:id", auth.checkIfAdmin, userAction.read);

router.post(
  "/api/users",
  formSignup.validate,
  auth.hashPassword,
  userAction.add,
);
router.post("/api/users/watchlist", auth.verify, userAction.addWatchlist);
router.post("/api/login", auth.login);

router.put(
  "/api/users/premium",
  auth.verify,
  auth.upgradeToPremium,
  userAction.editPremium,
);
router.put("/api/users/:id", auth.checkIfAdmin, userAction.edit);

router.delete(
  "/api/users/watchlist",
  auth.verify,
  userAction.destroyWatchlistUser,
);

router.delete("/api/users/:id", auth.checkIfAdmin, userAction.destroy);

router.get(
  "/api/checkAdmin",
  auth.verify,
  auth.checkIfAdmin,
  userAction.sendSuccessStatus,
);

router.get(
  "/api/checkAdminOrUser",
  auth.verify,
  auth.checkIfAdminOrUser,
  userAction.sendSuccessStatus,
);

router.get("/api/logout", auth.logout);

/* ************************************************************************ */

export default router;
