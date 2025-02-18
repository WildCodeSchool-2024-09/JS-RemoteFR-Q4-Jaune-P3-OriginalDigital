import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";
router.post("/api/items", itemActions.add);

/* ************************************************************************* */
import movieActions from "./modules/movie/movieActions";

router.get("/api/movies", movieActions.browse);
router.get("/api/movies/:id", movieActions.read);
/* ************************************************************************* */

export default router;
