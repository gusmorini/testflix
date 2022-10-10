import React from "react";
import "./style.css";
import { limitText } from "../../helpers/index";

const MovieFeature = ({ item }) => {
  const url_image = "https://image.tmdb.org/t/p/original" + item.backdrop_path;
  const vote = ((item.vote_average * 1000) / 100).toFixed(0);
  const initial_date = item.first_air_date || item.release_date;
  const date = initial_date ? initial_date.split("-")[0] : "";
  const genres = [];
  for (let n in item.genres) {
    genres.push(item.genres[n].name);
  }

  const cont = window.innerHeight <= 360 ? 100 : 360;

  return (
    <div className="feature">
      <div
        className="feature--cover"
        style={{ backgroundImage: `url(${url_image})` }}
      ></div>

      <div className="container">
        <div className="feature--box">
          <h1 className="feature--title">{item.name || item.title}</h1>
          <div className="feature--info">
            <p className="info--relevance">{vote}% Relevância</p>
            <p className="info--year">{date}</p>
            <p className="info--duration">
              {item.number_of_seasons
                ? `${item.number_of_seasons} ${
                    item.number_of_seasons > 1 ? "temporadas" : "temporada"
                  }`
                : `${item.runtime} min`}
            </p>
          </div>
          <p className="feature--overview">
            {limitText(item.overview || "...", cont)}
          </p>
          <div className="feature--buttons">
            <a className="play" href="#">
              assistir
            </a>
            <a className="mylist" href="#">
              minha lista
            </a>
          </div>
          <div className="feature--genres">
            <strong>Gêneros: </strong>
            <span>{genres.join(", ")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieFeature;
