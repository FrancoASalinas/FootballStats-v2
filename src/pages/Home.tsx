import { Link } from 'react-router-dom';
import { useState } from 'react';

function Home() {
  const [favorites, setFavorites] = useState([]); //make favorites
  const [recents, setrecents] = useState([]); //make recents

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-[65%_35%]">
        <article className="my-5 w-full">
          <h2 className="text-3xl">Your favorite Topics</h2>
          <ul>
            {favorites.length > 0 ? (
              favorites.map(() => <li></li>)
            ) : (
              <li>Here will be your favorite teams & players</li>
            )}
          </ul>
          <Link className="py-2 my-2 underline" to="countries">
            Browse Teams
          </Link>
        </article>
        <aside className="my-5 border-t p-2 sm:border-t-0 sm:border-l h-full border-dark min-h-[50%]">
          <h3 className="text-2xl">Recently visited Topics</h3>
          <ul>
            {recents.length > 0 ? (
              recents.map(() => <li></li>)
            ) : (
              <li>
                Looks like you didn't visited any Topic yet.{' '}
                <Link className="py-2 my-2 underline" to="countries">
                  Browse Teams
                </Link>
              </li>
            )}
          </ul>
        </aside>
      </div>
    </>
  );
}

export default Home;
