import {Link} from 'react-router-dom';
import useInstallPrompt from '../utils/useInstallPrompt';

function Welcome() {
  const showInstallPrompt = useInstallPrompt();

  return (
    <header className="w-full h-screen items-center justify-center bg-primary grid grid-rows-[85%_15%] font-anton">
      <div className="p-5 flex flex-col items-center justify-between">
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
          className="border-black border rounded-lg p-2 flex gap-3 items-center"
          onClick={showInstallPrompt}
        >
          Install <Download />
        </button>
        <span>Or</span>
        <button className="border-black border rounded-lg p-2 flex gap-3 items-center">
          <Link to="/">Get Started</Link>{' '}
          <Arrow />
        </button>
      </div>
    </header>
  );
}

const Download = () => <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>

const Arrow = () => <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>

export default Welcome;