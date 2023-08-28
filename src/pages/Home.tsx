import { Link, useNavigate, useNavigation } from 'react-router-dom';
import useFavoriteData from '../utils/useFavoriteData';
import { useState, useEffect } from 'react';
import useRecentlyVisited from '../utils/useRecentlyVisited';
import Spinner from '../modules/Spinner';

function Home() {
  const [favorites, setFavorites] = useState<string[] | []>([]);
  const [recents, setRecents] = useRecentlyVisited();

  const navigate = useNavigate();
  const navigation = useNavigation()

  useEffect(() => {
    setFavorites(useFavoriteData('_fav', 'retrieveKey'));

    if (localStorage.getItem('welcome') === null) {
      localStorage.welcome = '';
      navigate('/FootballStats-v2/welcome');
    }
  }, []);

  return (
    navigation.state === 'loading' ?
    <Spinner/> :
    <>
      <div className="grid grid-cols-1 sm:grid-cols-[65%_35%]">
        <article className="my-5 w-full">
          <h2 className="text-3xl mb-5">Your favorite Topics</h2>
          <ul
            className={`divide-dark ${
              useFavoriteData('_fav', 'retrieveKey').length > 0 && 'divide-y'
            }  dark:divide-light`}
          >
            {useFavoriteData('_fav', 'retrieveKey').length > 0 ? (
              useFavoriteData('_fav', 'retrieveKey').map((key) => {
                const title = JSON.parse(
                  window.localStorage.getItem(key) as string
                )[0];
                const path = JSON.parse(
                  window.localStorage.getItem(key) as string
                )[1];

                return (
                  <li
                    key={key}
                    className="flex py-3 justify-between w-full items-center"
                  >
                    <Link to={path}>{title}</Link>
                    <button
                      className="hover:underline cursor-pointer"
                      onClick={() => {
                        setFavorites(favorites.filter((item) => item === key));
                        useFavoriteData(key, 'remove');
                      }}
                    >
                      Delete
                    </button>
                  </li>
                );
              })
            ) : (
              <>
                <p className="text-xl">You don't have any favorites yet.</p>
                <Link className="py-2 my-2 underline" to="countries">
                  Browse Teams
                </Link>
              </>
            )}
          </ul>
        </article>
        <aside className="my-5 border-t pt-5 sm:pt-0 dark:border-light p-2 sm:border-t-0 sm:border-l h-full border-dark min-h-[50%]">
          <div className="flex justify-between">
            <h3 className="text-2xl mb-5">Recently visited Topics</h3>
            {recents.length > 0 && (
              <button
                className="hover:underline cursor-pointer"
                onClick={() => setRecents([])}
              >
                Delete All
              </button>
            )}
          </div>
          <ul
            className={`${
              recents.length > 0 && 'divide-y'
            } divide-dark dark:divide-white`}
          >
            {recents.length > 0 ? (
              recents.map((recent: any, index: number) => {
                const title = recent[0];
                const path = recent[1];

                return (
                  <li
                    key={recent[0] + index}
                    className="flex py-3 justify-between w-full items-center"
                  >
                    <Link to={path}>{title}</Link>
                    <button
                      className="hover:underline cursor-pointer"
                      onClick={() =>
                        setRecents(
                          recents.filter((item: any) => item !== recent)
                        )
                      }
                    >
                      Delete
                    </button>
                  </li>
                );
              })
            ) : (
              <Link className="py-2 my-2 underline" to="countries">
                Browse Teams
              </Link>
            )}
          </ul>
        </aside>
      </div>
    </>
  );
}

export default Home;
