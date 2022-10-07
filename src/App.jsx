import React, { useEffect, useState } from "react";

import { homeList } from "./api/Tmdb";

export default () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      const list = await homeList();
      setList(list);
    };
    getAll();
  }, []);

  return <div className="page"></div>;
};
