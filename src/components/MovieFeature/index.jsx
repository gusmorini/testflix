import React from "react";
import "./style.css";
import { limitText } from "../../helpers/index";

import MovieTitle from "../MovieTitle";
import MovieInfo from "../MovieInfo";
import MovieOverview from "../MovieOverview";
import Genres from "../MovieGenres";

const MovieFeature = ({ item }) => {
  const url_image = "https://image.tmdb.org/t/p/original" + item.backdrop_path;

  return (
    <div className="feature">
      <div
        className="feature--cover"
        style={{ backgroundImage: `url(${url_image})` }}
      ></div>

      <div className="container">
        <div className="feature--box">
          <MovieTitle item={item} />
          <MovieInfo item={item} />
          <MovieOverview item={item} />
          <Genres item={item} />
        </div>
      </div>
    </div>
  );
};

export default MovieFeature;
