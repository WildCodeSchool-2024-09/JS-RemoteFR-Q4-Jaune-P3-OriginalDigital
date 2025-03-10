import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <h1>Original Digital</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/auth">Se connecter</Link>
          </li>
          <li>
            <Link to="/users">Liste des utilisateurs</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
