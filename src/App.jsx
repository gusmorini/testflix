import React, { useEffect, useState } from "react";
import "./App.css";
import MovieRow from "./components/MovieRow/index";
import MovieFeature from "./components/MovieFeature";
import { homeList, getFeature } from "./api/Tmdb";
import { randomArray } from "./helpers/index";

export default () => {
  const [list, setList] = useState([]);
  const [feature, setFeature] = useState(null);

  useEffect(() => {
    const getAll = async () => {
      // list
      const list = await homeList();
      // console.log("LIST ---- ", list);
      setList(list);
      // feature
      const filter = list.filter(
        (item) => item.slug == "series" || item.slug == "movies"
      );
      const randomFeature = randomArray(filter);
      const randomFeatureItem = randomArray(randomFeature.items.results);
      const data = await getFeature(randomFeatureItem.id, randomFeature.slug);
      setFeature(data);
    };
    getAll();
  }, []);

  return (
    <div className="page">
      {feature && <MovieFeature item={feature} />}
      <section className="list">
        {list.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
};
