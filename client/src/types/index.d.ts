interface UserTypes {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

interface SvgTypes {
  path: string;
  width: string;
  height: string;
}

interface FormTypes {
  user: UserTypes;
  handleChangeForm: React.ChangeEventHandler<HTMLInputElement>;
}

interface MovieType {
  id: number;
  title: string;
  release_year: number;
  poster: string;
  duration: string;
  synopsis: string;
  trailer: string;
  casting: string;
  production: string;
  landscape_image: string;
  genres: string;
  premium: boolean;
}

interface MoviesProps {
  movie: MovieType;
}

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface UserType {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  subscription: boolean;
}

interface LoginData {
  email: string;
  password: string;
}

interface CardData {
  cardName: string;
  cardNumbers: string;
  expiryDay: string;
  cvv: string;
  country: string;
}
interface MovieDetailsProps {
  movieId: MovieType;
}
