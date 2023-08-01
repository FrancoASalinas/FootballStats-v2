import { Link } from 'react-router-dom';
import useFavoriteData from '../utils/useFavoriteData';
import { useState, useEffect } from 'react';

function Home() {
  const [favorites, setFavorites] = useState<string[] | []>([]);

  useEffect(() => {
    setFavorites(useFavoriteData('_fav', 'retrieveKey'));
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-[65%_35%]">
        <article className="my-5 w-full">
          <h2 className="text-3xl">Your favorite Topics</h2>
          {useFavoriteData('_fav', 'retrieveKey').length > 0 ? (
            useFavoriteData('_fav', 'retrieveKey').map((key) => {
              const title = JSON.parse(
                window.localStorage.getItem(key) as string
              )[0];
              const path = JSON.parse(
                window.localStorage.getItem(key) as string
              )[1];

              return (
                <li key={key} className="flex gap-3">
                  <Link to={path}>{title}</Link>
                  <a
                    className="hover:underline cursor-pointer"
                    onClick={() => {
                      setFavorites(favorites.filter((item) => item === key));
                      useFavoriteData(key, 'remove');
                    }}
                  >
                    Delete
                  </a>
                </li>
              );
            })
          ) : (
            <Link className="py-2 my-2 underline" to="countries">
              Browse Teams
            </Link>
          )}
        </article>
        <aside className="my-5 border-t p-2 sm:border-t-0 sm:border-l h-full border-dark min-h-[50%]">
          <h3 className="text-2xl">Recently visited Topics</h3>
        </aside>
      </div>
    </>
  );
}

export default Home;
