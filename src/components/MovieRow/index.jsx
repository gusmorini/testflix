import React, { useEffect, useState } from "react";
import "./style.css";

const MovieRow = ({ title, items, getFeatureItem }) => {
  const base_image = "https://image.tmdb.org/t/p/w200";

  const [scrollX, setScrollX] = useState(0);

  const itemW = 180;
  const listW = items.results.length * itemW;
  const rangeDefault = Math.round(window.innerWidth / 1.2);
  const screenW = Math.round(window.innerWidth);

  const handleDrag = (e) => {
    console.log("ELEMENT --- ", e.changedTouches[0]);
    const screenM = e.changedTouches[0].clientX;
    let x = scrollX;
    console.log("SCREEN X", screenM);
    console.log("SCREEN W", screenW);
    console.log("SCREEN /2 ", screenW / 2);
    if (screenM < screenW / 2) {
      handleRight(20);
    } else {
      handleLeft(20);
    }
  };

  const handleLeft = () => {
    let x = scrollX + rangeDefault;
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRight = () => {
    let x = scrollX - rangeDefault;
    const limit = screenW - listW;
    if (limit > x) {
      x = limit - 60;
    }
    setScrollX(x);
  };

  return (
    <div className="movieRow">
      <p className="movieRow--title">{title}</p>

      <div className="movieRow--arrow arrow--left" onClick={handleLeft}>
        <img src="/img/chevron-left.png" alt="" />
      </div>
      <div className="movieRow--arrow arrow--right" onClick={handleRight}>
        <img src="/img/chevron-right.png" alt="" />
      </div>
      <div
        className="movieRow--listarea"
        style={{
          marginLeft: scrollX,
          width: listW,
        }}
        // onTouchMove={handleDrag}
      >
        {items.results.length > 0 &&
          items.results.map((item, key) => (
            <div key={key} className="movieRow--item" style={{ width: itemW }}>
              <img
                src={base_image + item.poster_path}
                alt={item.original_title}
                onClick={() => getFeatureItem(item)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default MovieRow;
