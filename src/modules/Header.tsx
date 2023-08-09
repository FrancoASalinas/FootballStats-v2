import { useState } from 'react';
import { Link } from 'react-router-dom';
import useInstallPrompt from '../utils/useInstallPrompt';
import Slider from './Slider';
import useOfflineMode from '../utils/useOfflineMode';

function Header({
  onChange,
  darkTheme,
}: {
  onChange: VoidFunction;
  darkTheme: boolean;
}) {
  const [nav, setNav] = useState(false);

  const [offline, setOffline] = useOfflineMode();

  const showInstallPrompt = useInstallPrompt();

  function handleNav() {
    setNav((prev) => !prev);
  }

  return (
    <header className="flex font-anton p-4 text-xl justify-between lg:text-2xl h-20 fixed top-0 w-full dark:border-gray-600 border-b border-black bg-primary z-0 items-center">
      <h2 className="justify-self-start block text-4xl">
        <Link to="/">FS</Link>
      </h2>
      <button onClick={handleNav}>
        <i className="fa-solid fa-bars sm:hidden sm:w-0 sm:h-0"></i>
      </button>
      <nav
        className={`absolute top-full right-0 w-full transition-all -z-10 h-max bg-primary grid grid-cols-2 grid-rows-1 sm:hidden sm:w-0 lg:w-full  ${
          nav
            ? 'translate-y-0 visible opacity-100'
            : '-translate-y-full invisible opacity-0'
        }`}
      >
        <ul>
          <li className="p-3">
            <Link to="countries" onClick={handleNav}>
              Competitions
            </Link>
          </li>
          <li className="p-3">
            <Link to="fixtures" onClick={handleNav}>
              Live Fixtures
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <button onClick={showInstallPrompt} className="p-3">
              Install the App
            </button>
          </li>
          <li className="p-3">
            <Slider checked={darkTheme} onChange={onChange}>
              <i className="fa-solid fa-moon absolute top-1/2 -translate-y-1/2 left-1 z-10 opacity-0 peer-checked:opacity-100 duration-[.2s] text-light"></i>
              <span className="absolute cursor-pointer peer-checked:bg-dark top-0 left-0 right-0 bottom-0 bg-light duration-[.2s] rounded-full before:absolute before:h-[26px] before:w-[26px] before:left-[4px] before:bottom-[4px] before:bg-primary before:duration-[.2s] peer-checked:before:translate-x-full before:rounded-full"></span>
              <i className="fa-solid fa-sun absolute top-1/2 -translate-y-1/2 right-1 z-10 opacity-100 peer-checked:opacity-0 duration-[.2s] text-dark "></i>
            </Slider>
          </li>
          <li className="p-3 flex gap-2 items-center">
            <Slider checked={offline} onChange={() => setOffline()}>
              <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-light duration-[.2s] rounded-full before:absolute before:h-[26px] before:w-[26px] before:left-[4px] before:bottom-[4px] peer-checked:before:bg-dark before:bg-primary before:duration-[.2s] peer-checked:before:translate-x-full before:rounded-full"></span>
            </Slider>
            <span className="text-xs">{offline ? 'Offline' : 'Online'}</span>
          </li>
        </ul>
      </nav>
      <nav className="hidden sm:block">
        <ul className="flex justify-between divide-x divide-dark">
          <li className="p-3">
            <Link to="fixtures" onClick={handleNav}>
              Live Fixtures
            </Link>
          </li>
          <li className="p-3">
            <Link to="countries" onClick={handleNav}>
              Competitions
            </Link>
          </li>
          <li>
            <button className="p-3" onClick={showInstallPrompt}>
              Install the App
            </button>
          </li>
          <li className="p-3">
            <Slider checked={darkTheme} onChange={onChange}>
              <i className="fa-solid fa-moon absolute top-1/2 -translate-y-1/2 left-1 z-10 opacity-0 peer-checked:opacity-100 duration-[.2s] text-light"></i>
              <span className="absolute cursor-pointer peer-checked:bg-dark top-0 left-0 right-0 bottom-0 bg-light duration-[.2s] rounded-full before:absolute before:h-[26px] before:w-[26px] before:left-[4px] before:bottom-[4px] before:bg-primary before:duration-[.2s] peer-checked:before:translate-x-full before:rounded-full"></span>
              <i className="fa-solid fa-sun absolute top-1/2 -translate-y-1/2 right-1 z-10 opacity-100 peer-checked:opacity-0 duration-[.2s] text-dark "></i>
            </Slider>
          </li>
          <li className="p-3 flex gap-2 items-center">
            <Slider checked={offline} onChange={() => setOffline()}>
              <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-light duration-[.2s] rounded-full before:absolute before:h-[26px] before:w-[26px] before:left-[4px] before:bottom-[4px] peer-checked:before:bg-dark before:bg-primary before:duration-[.2s] peer-checked:before:translate-x-full before:rounded-full"></span>
            </Slider>
            <span className="text-xs">{offline ? 'Offline' : 'Online'}</span>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
