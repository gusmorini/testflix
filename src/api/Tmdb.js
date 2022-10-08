const KEY = import.meta.env.VITE_API_KEY;
const API_BASE = "https://api.themoviedb.org/3";
const ADDONS = `?api_key=${KEY}&language=pt-BR`;

const getData = async (endpoint, query = "") => {
  return fetch(API_BASE + endpoint + ADDONS + query)
    .then((resp) => resp.json())
    .then((data) => data)
    .catch((err) => err);
};

const getDataGenrers = async () => {
  const { genres } = await getData("/genre/movie/list");
  const promises = genres.map(async (item) => {
    return {
      slug: item.name,
      title: item.name,
      items: await getData("/discover/movie", `&with_genres=${item.id}`),
    };
  });
  return await Promise.all(promises);
};

export const getFeature = async (id, type) => {
  switch (type) {
    case "movies":
      return await getData(`/movie/${id}`);
    case "series":
      return await getData(`/tv/${id}`);
  }
};

export const homeList = async () => {
  const custom = [
    {
      slug: "series",
      title: "séries",
      items: await getData("/discover/tv"),
    },
    {
      slug: "movies",
      title: "filmes",
      items: await getData("/discover/movie"),
    },
    {
      slug: "trending",
      title: "recomendados para você",
      items: await getData("/trending/all/week"),
    },
    {
      slug: "toprated",
      title: "em alta",
      items: await getData("/movie/top_rated"),
    },
  ];

  const genres = await getDataGenrers();

  const result = custom.concat(genres);

  return result;
};
