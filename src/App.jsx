import React, { useEffect, useState } from "react";
import "./App.css";

import { homeList, getFeature } from "./api/Tmdb";
import { randomArray } from "./helpers/index";

import MovieRow from "./components/MovieRow/index";
import MovieFeature from "./components/MovieFeature";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Footer from "./components/Footer";

export default () => {
  const [list, setList] = useState([]);
  const [feature, setFeature] = useState(null);
  const [headerDark, setHeaderDark] = useState(false);

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

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY >= 100) {
        setHeaderDark(true);
      } else {
        setHeaderDark(false);
      }
    };
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.addEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header dark={headerDark} />
      {feature && <MovieFeature item={feature} />}
      <section className="page--list container">
        {list.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
      {list.length <= 0 && <Loader />}
      <Footer />
    </div>
  );
};
