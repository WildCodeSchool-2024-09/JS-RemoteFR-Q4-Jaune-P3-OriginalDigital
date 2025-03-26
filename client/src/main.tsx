// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* ************************************************************************* */

// Import the main app component
import App from "./App";
import Catalogue from "./pages/Catalogue";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import Forbidden from "./pages/Forbidden";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import MovieDetail from "./pages/MovieDetail";
import Payment from "./pages/Payment";
import Signup from "./pages/Signup";
import {
  getAuthorization,
  getAuthorizationForUsersOrAdmin,
  getMovieById,
  getMovies,
  getUsers,
  viewFavorites,
} from "./services/request";

// Import additional components for new routes
// Try creating these components in the "pages" folder
import { AuthProvider } from "./services/AuthContext";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
  {
    // The root path
    element: <App />, // Renders the App component for the home page
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: getMovies,
      },
      {
        path: "/movies/:id",
        element: <MovieDetail />,
        loader: async ({ params }) => ({
          movieId: await getMovieById(Number(params.id)),
          movies: await getMovies(),
        }),
        errorElement: <Signup />,
      },
      {
        path: "/catalogue",
        element: <Catalogue />,
        loader: async () => ({
          authorization: await getAuthorizationForUsersOrAdmin(),
          movies: await getMovies(),
          favorite: await viewFavorites(),
        }),
        errorElement: <Forbidden />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        loader: async () => ({
          authorization: await getAuthorization(),
          movies: await getMovies(),
          users: await getUsers(),
        }),
        errorElement: <Forbidden />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
    ],
    // Try adding a new route! For example, "/about" with an About component
  },
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
