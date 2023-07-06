import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { getRandomCats } from "./common/services/cats.services";
import { useInView } from "react-intersection-observer";

const App = () => {
  const [cats, setCats] = useState([]);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { mutate } = useSWR(
    "getRandomCats",
    async () => {
      const newCats = await getRandomCats();
      setCats([...cats, ...newCats]);
      return newCats;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (!inView) return;

    mutate();
  }, [inView]);

  console.log(import.meta.env.VITE_APP_TEST);

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        scrollSnapType: "y mandatory",
        overflowY: "scroll",
      }}
    >
      {cats?.map((cat, i) => (
        <section
          key={cat.id}
          ref={(e) => {
            if (cat.id === cats[cats.length - 3].id) ref(e);
          }}
          style={{
            height: "100vh",
            background: "red",
            scrollSnapAlign: "start",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "100%",
              background: `url(${cat.url})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>
        </section>
      ))}
    </main>
  );
};

export default App;

// comentario sin valor
