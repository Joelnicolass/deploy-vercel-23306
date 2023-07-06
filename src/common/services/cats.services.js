import { catsApi } from "../api/cats.api";

export const getRandomCats = async () => {
  const { data } = await catsApi.get("/images/search", {
    params: {
      limit: 10,
    },
  });

  return data;
};
