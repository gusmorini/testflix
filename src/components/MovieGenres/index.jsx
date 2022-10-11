import React from "react";
import "./style.css";

const MovieGenres = ({ item }) => {
  const genres = [];
  for (let n in item.genres) {
    genres.push(item.genres[n].name);
  }
  return (
    <div className="genres">
      <strong>Gêneros: </strong>
      <span>{genres.join(", ")}</span>
    </div>
  );
};

export default MovieGenres;
