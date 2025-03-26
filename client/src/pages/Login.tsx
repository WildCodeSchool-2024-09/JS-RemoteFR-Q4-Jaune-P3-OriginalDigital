import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import { useAuth } from "../services/AuthContext";
import { loginUser } from "../services/request";

export default function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { setRole, setSubscription } = useAuth();

  const handleChangeCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  const sendCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser(credentials, navigate, setRole, setSubscription);
  };
  return (
    <div>
      <section className="login">
        <form className="login-page" onSubmit={sendCredentials}>
          <h2>Se Connecter</h2>
          <p>
            Vous pouvez vous connecter si vous possédez un compte, sinon vous
            pouvez en créez un <Link to="/signup">ici</Link>
          </p>
          <div className="container-form">
            <div className="login-form">
              <label htmlFor="email">E-mail : </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Votre E-mail"
                onChange={handleChangeCredentials}
                value={credentials.email}
              />
            </div>
            <div className="login-form">
              <label htmlFor="password">Password : </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Votre Password"
                onChange={handleChangeCredentials}
                value={credentials.password}
              />
            </div>
            <input type="submit" value="Continuer" />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />
          </div>
        </form>
      </section>
    </div>
  );
}
