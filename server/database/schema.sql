create table user (
  id int unsigned primary key auto_increment not null,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email varchar(255) not null unique,
  password varchar(255) not null,
  subscription BOOLEAN NOT NULL,
  role VARCHAR(50) NOT NULL
);

create table movie (
  id int unsigned primary key auto_increment not null,
  title varchar(255) not null,
  synopsis TEXT not null,
  release_year YEAR  not null,
  duration TIME not null,
  poster VARCHAR(255) NOT NULL,
  trailer VARCHAR(255) NOT NULL
);

create table genre (
id int unsigned primary key auto_increment not null,
name VARCHAR(255) not null
);

create table movie_genre (
movie_id INT NOT NULL,
genre_id INT NOT NULL
);

create table watchlist (
movie_id int not null,
user_id int not null
);

insert into movie (title, synopsis, release_year, duration, poster, trailer)
VALUES
  ("Matrix","Programmeur anonyme dans un service administratif le jour, Thomas Anderson devient Neo la nuit venue. Sous ce pseudonyme, il est l'un des pirates les plus recherchés du cyber-espace. A cheval entre deux mondes, Neo est assailli par d'étranges songes et des messages cryptés provenant d'un certain Morpheus. Celui-ci l'exhorte à aller au-delà des apparences et à trouver la réponse à la question qui hante constamment ses pensées : qu'est-ce que la Matrice ? Nul ne le sait, et aucun homme n'est encore parvenu à en percer les defenses. Mais Morpheus est persuadé que Neo est l'Elu, le libérateur mythique de l'humanité annoncé selon la prophétie. Ensemble, ils se lancent dans une lutte sans retour contre la Matrice et ses terribles agents...", "1999", "02:15:00",  "https://fr.web.img4.acsta.net/c_310_420/medias/04/34/49/043449_af.jpg", "https://www.youtube.com/watch?v=vKQi3bBA1y8&ab_channel=RottenTomatoesClassicTrailers" );

