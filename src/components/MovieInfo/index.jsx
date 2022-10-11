import React from "react";
import "./style.css";

const MovieInfo = ({ item }) => {
  const vote = ((item.vote_average * 1000) / 100).toFixed(0);
  const initial_date = item.first_air_date || item.release_date;
  const date = initial_date ? initial_date.split("-")[0] : "";
  return (
    <div className="info">
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
  );
};

export default MovieInfo;
