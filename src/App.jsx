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

  /** get all items */
  const getAll = async () => {
    // list
    const list = await homeList();
    setList(list);
    // feature
    const randomFeature = randomArray(list);
    const randomFeatureItem = randomArray(randomFeature.items.results);
    getFeatureItem(randomFeatureItem);
  };

  /** get feature */
  const getFeatureItem = async (item) => {
    const data = await getFeature(item);
    setFeature(data);
  };

  useEffect(() => {
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
          <MovieRow
            key={key}
            title={item.title}
            items={item.items}
            getFeatureItem={getFeatureItem}
          />
        ))}
      </section>
      {list.length <= 0 && <Loader />}
      <Footer />
    </div>
  );
};
