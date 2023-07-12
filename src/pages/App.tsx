import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [nav, setNav] = useState(false);

  function handleNav() {
    setNav((prev) => !prev);
  }

  return (
    <>
      <header className="flex p-5 text-xl justify-between relative bg-primary">
        <button>
          <Link to="/">Football Stats</Link>
        </button>
        <button onClick={handleNav}>
          <i className="fa-solid fa-bars"></i>
        </button>
        <nav
          className={`absolute top-full right-0 w-full transition-all z-10 h-max bg-primary grid grid-cols-2 grid-rows-1 ${
            nav ? 'translate-x-0 visible' : 'translate-x-full invisible'
          }`}
        >
          <ul>
            <li className="p-3">
              <Link to="competitions" onClick={handleNav}>
                Competitions
              </Link>
            </li>
            <li className="p-3">
              <Link to="countries" onClick={handleNav}>
                Teams
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <button className="p-3">Install the App</button>
            </li>
            <li className="p-3">
              <i className="fa-solid fa-moon"></i>
              <input type="checkbox" />
              <i className="fa-solid fa-sun"></i>
            </li>
          </ul>
        </nav>
      </header>
      <main className="bg-dark">
        <Outlet />
      </main>
    </>
  );
}

export default App;
