import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import axios from "axios";
import { useState } from "react";
import { Flip, ToastContainer, toast } from "react-toastify";
export default function Login() {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const notify = () =>
    toast.error(
      "Erreur lors de la connexion, mot de passe ou email incorrect",
      {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      },
    );
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const handleChangeCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  const sendCredentials = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`${API}/api/login`, credentials, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data === "administrateur") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <div>
        <ToastContainer />
      </div>
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
            <input type="submit" onClick={notify} value="Continuer" />
          </div>
        </form>
      </section>
    </div>
  );
}
