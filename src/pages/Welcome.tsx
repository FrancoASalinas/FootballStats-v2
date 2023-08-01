import {Link} from 'react-router-dom';
import useInstallPrompt from '../utils/useInstallPrompt';

function Welcome() {
  const showInstallPrompt = useInstallPrompt();

  return (
    <header className="w-full h-screen items-center justify-center bg-primary grid grid-rows-[85%_15%] font-anton">
      <div className="p-5">
        <h1 className="text-7xl flex flex-col sm:text-8xl md:text-9xl">
          <span>Football</span>
          <span> Stats</span>
        </h1>
        <p className="m-2 sm:text-2xl">
          The place where you get everything from your favorite sport
        </p>
      </div>
      <div className="flex gap-5 justify-center items-center text-sm sm:text-xl md:text-2xl">
        <button
          className="border-black border rounded-lg p-2"
          onClick={showInstallPrompt}
        >
          Install <i className="fa-solid fa-download"></i>
        </button>
        <span>Or</span>
        <button className="border-black border rounded-lg p-2">
          <Link to="/">Get Started</Link>{' '}
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </header>
  );
}

export default Welcome;