import { Link } from "react-router-dom";
import Slider from "./Slider";
import useOfflineMode from "../utils/useOfflineMode";
import useDarkTheme from "../utils/useDarkTheme";
import useInstallPrompt from "../utils/useInstallPrompt";

interface Props{
    nav: boolean;
    handleNav: () => void
}

function MobileNav({nav, handleNav}: Props) {

    const [offline, setOffline] = useOfflineMode();
    const [darkTheme, setDarkTheme] = useDarkTheme();
    const showInstallPrompt = useInstallPrompt()

    return ( 
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
            <Slider checked={darkTheme} onChange={setDarkTheme}>
              <Moon />
              <span className="absolute cursor-pointer peer-checked:bg-dark top-0 left-0 right-0 bottom-0 bg-light duration-[.2s] rounded-full before:absolute before:h-[26px] before:w-[26px] before:left-[4px] before:bottom-[4px] before:bg-primary before:duration-[.2s] peer-checked:before:translate-x-full before:rounded-full"></span>
              <Sun />
            </Slider>
          </li>
          <li className="p-3 flex gap-2 items-center">
            <Slider checked={offline} onChange={() => setOffline()}>
              <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-light duration-[.2s] rounded-full before:absolute before:h-[26px] before:w-[26px] before:left-[4px] before:bottom-[4px] peer-checked:before:bg-dark before:bg-primary before:duration-[.2s] peer-checked:before:translate-x-full before:rounded-full"></span>
            </Slider>
            <span className="text-xs">{offline ? 'Offline' : 'Online'}</span>
          </li>
          <li className="flex items-center p-3">
            <button className="text-sm" onClick={() => localStorage.clear()}>
              Clear local storage
            </button>
          </li>
        </ul>
      </nav>
     );
}

export const Moon = () => <svg className="absolute top-1/2 -translate-y-1/2 left-1 z-10 opacity-0 peer-checked:opacity-100 duration-[.2s] fill-light" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/></svg>

export const Sun = () => <svg className=" absolute top-1/2 -translate-y-1/2 right-1 z-10 opacity-100 peer-checked:opacity-0 duration-[.2s] fill-dark " xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"/></svg>

export default MobileNav;