import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const MovieList = ({ items, title }) => {
  const base_img = "https://image.tmdb.org/t/p/w300";

  const renderItem = (item, key) => {
    return (
      <div key={key} className="item">
        <Link
          to={`/about/${item.id}/${item.original_title || item.original_name}`}
        >
          <img
            src={base_img + item.poster_path}
            alt={item.title || item.name}
            draggable="false"
          />
        </Link>
      </div>
    );
  };

  return (
    <div className="similar">
      <h3 className="title">{title}</h3>
      <div className="list">
        {items.length > 0
          ? items.map((item, key) => renderItem(item, key))
          : "nada encontrado"}
      </div>
    </div>
  );
};

export default MovieList;
