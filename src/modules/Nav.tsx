import { Link } from "react-router-dom";
import useDarkTheme from "../utils/useDarkTheme";
import useInstallPrompt from "../utils/useInstallPrompt";
import Slider from "./Slider";
import useOfflineMode from "../utils/useOfflineMode";
import { Moon, Sun } from "./MobileNav";

function Nav() {

    const [darkTheme, setDarkTheme] = useDarkTheme()
    const showInstallPrompt = useInstallPrompt();
    const [offline, setOffline] = useOfflineMode();

    return ( 
        <nav className="hidden sm:block">
        <ul className="flex justify-between divide-x divide-dark">
          <li className="p-3">
            <Link to="fixtures">
              Live Fixtures
            </Link>
          </li>
          <li className="p-3">
            <Link to="countries">
              Competitions
            </Link>
          </li>
          <li>
            <button className="p-3" onClick={showInstallPrompt}>
              Install the App
            </button>
          </li>
          <li className="p-3">
            <Slider checked={darkTheme} onChange={setDarkTheme}>
              <Moon/>
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

export default Nav;