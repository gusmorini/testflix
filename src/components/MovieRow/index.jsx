import React, { useState, useEffect } from "react";
import "./style.css";

const MovieRow = ({ title, items, getFeatureItem }) => {
  const base_image = "https://image.tmdb.org/t/p/w200";

  const [scrollX, setScrollX] = useState(0);

  const [itemW] = useState(180);
  const [listW] = useState(items.results.length * itemW);

  // const screenW = document.querySelector(".movieRow").clientWidth;

  // const [screenW, setScreenW] = useState(
  //   document.querySelector("#movieRow").clientWidth
  // );
  // const [rangeDefault, setRangeDefault] = useState(screenW / 2);

  const handleArrow = (arrow = "left") => {
    const screenW = document.querySelector(".movieRow").clientWidth;
    const range = screenW / 2;

    let x = scrollX;

    if (arrow == "left") {
      x += range;
      if (x > 0) x = 0;
    } else {
      x -= range;
      const listW = document.querySelector(".movieRow--listarea").clientWidth;
      const limit = screenW - listW;
      if (limit > x) x = limit;
    }

    setScrollX(x);
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
      x = limit;
    }
    setScrollX(x);
  };

  return (
    <div className="movieRow">
      <p className="movieRow--title">{title}</p>

      <div
        className="movieRow--arrow arrow--left"
        onClick={() => handleArrow("left")}
      >
        <img src="/img/chevron-left.png" alt="" />
      </div>
      <div
        className="movieRow--arrow arrow--right"
        onClick={() => handleArrow("right")}
      >
        <img src="/img/chevron-right.png" alt="" />
      </div>
      <div
        className="movieRow--listarea"
        style={{
          marginLeft: scrollX,
          width: listW,
        }}
      >
        {items.results.length > 0 &&
          items.results.map((item, key) => (
            <div key={key} className="movieRow--item" style={{ width: itemW }}>
              <a
                href={`about/${item.id}/${
                  item.original_title || item.original_name
                }`}
              >
                <img
                  src={base_image + item.poster_path}
                  alt={item.original_title}
                />
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MovieRow;
