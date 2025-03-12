import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SvgIcons from "./SvgIcons";
import "../styles/signupForm.css";
import { Bounce, ToastContainer } from "react-toastify";
import { createUser } from "../services/request";

const icon = {
  visible: {
    width: "21px",
    height: "21px",
    path: "M480-312q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Zm0-72q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm0 192q-142.6 0-259.8-78.5Q103-349 48-480q55-131 172.2-209.5Q337.4-768 480-768q142.6 0 259.8 78.5Q857-611 912-480q-55 131-172.2 209.5Q622.6-192 480-192Zm0-288Zm0 216q112 0 207-58t146-158q-51-100-146-158t-207-58q-112 0-207 58T127-480q51 100 146 158t207 58Z",
  },
  notVisible: {
    width: "21px",
    height: "21px",
    path: "m637-425-62-62q4-38-23-65.5T487-576l-62-62q13-5 27-7.5t28-2.5q70 0 119 49t49 119q0 14-2.5 28t-8.5 27Zm133 133-52-52q36-28 65.5-61.5T833-480q-49-101-144.5-158.5T480-696q-26 0-51 3t-49 10l-58-58q38-15 77.5-21t80.5-6q143 0 261.5 77.5T912-480q-22 57-58.5 103.5T770-292Zm-2 202L638-220q-38 14-77.5 21t-80.5 7q-143 0-261.5-77.5T48-480q22-57 58-104t84-85L90-769l51-51 678 679-51 51ZM241-617q-35 28-65 61.5T127-480q49 101 144.5 158.5T480-264q26 0 51-3.5t50-9.5l-45-45q-14 5-28 7.5t-28 2.5q-70 0-119-49t-49-119q0-14 3.5-28t6.5-28l-81-81Zm287 89Zm-96 96Z",
  },
};

export default function SignupForm() {
  const navigate = useNavigate();
  const [showFullForm, setShowFullForm] = useState(false);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  } as UserData);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowFullForm(true);
  };

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const success = await createUser(user);

      if (success) {
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [confirmPassword, setConfirmPassword] = useState(false);
  const toggleConfirmPassword = () => {
    setConfirmPassword(!confirmPassword);
  };

  const showIconPassword = showPassword ? icon.visible : icon.notVisible;

  const showIconConfirmPassword = confirmPassword
    ? icon.visible
    : icon.notVisible;

  const [checked, setChecked] = useState(false);
  const toggleCheck = () => {
    setChecked(!checked);
  };

  return (
    <>
      {!showFullForm ? (
        <form onSubmit={handleEmailSubmit}>
          <h1>S'inscrire</h1>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={(e) => {
              setUser((prev) => ({ ...prev, email: e.target.value }));
            }}
            placeholder="Votre email"
            required
          />
          <button
            type="submit"
            className="submit"
            disabled={!isValidEmail(user.email)}
          >
            S'inscrire
          </button>
          <h2>Déjà membre ?</h2>
          <Link to="/login">Se connecter</Link>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Créer ton compte</h1>
          <h3>Tous les champs sont obligatoires</h3>
          <label htmlFor="first_name">
            Prénom<p>*</p>
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={user.first_name}
            onChange={handleChangeForm}
            placeholder="Votre prénom"
          />
          <label htmlFor="last_name">
            Nom<p>*</p>
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={user.last_name}
            onChange={handleChangeForm}
            placeholder="Votre nom"
          />
          <label htmlFor="email">
            Email<p>*</p>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChangeForm}
            placeholder="Votre adresse email"
          />
          <div className="password-input">
            <label htmlFor="password">
              Mot de passe<p>*</p>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              aria-invalid="false"
              aria-describedby="password-error-password"
              value={user.password}
              onChange={handleChangeForm}
              placeholder="Votre mot de passe"
            />
            <button type="button" onClick={togglePassword}>
              <SvgIcons
                path={showIconPassword.path}
                height={showIconPassword.height}
                width={showIconPassword.width}
              />
            </button>
          </div>
          <div className="password-input">
            <label htmlFor="confirmPassword">
              Confirmez votre mot de passe<p>*</p>
            </label>
            <input
              type={confirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChangeForm}
              placeholder="Confirmez votre mot de passe"
            />
            <button type="button" onClick={toggleConfirmPassword}>
              <SvgIcons
                path={showIconConfirmPassword.path}
                height={showIconConfirmPassword.height}
                width={showIconConfirmPassword.width}
              />
            </button>
          </div>
          <label htmlFor="checkbox" className="checkbox">
            <input
              type="checkbox"
              id="checkbox"
              checked={checked}
              onChange={toggleCheck}
            />
            <p>En cochant cette case, vous acceptez les CGU.</p>
          </label>
          <div>
            <button type="submit" className="submit" disabled={!checked}>
              Créer un compte
            </button>
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
      )}
    </>
  );
}
