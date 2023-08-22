import { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import MobileNav from './MobileNav';

function Header() {

  const [nav, setNav] = useState(false);
  const handleNav = () => setNav(prev => !prev);

  return (
    <header className="flex font-anton p-4 text-xl justify-between lg:text-2xl h-20 fixed top-0 w-full dark:border-gray-600 border-b border-black bg-primary z-0 items-center">
      <h2 className="justify-self-start block text-4xl">
        <Link to="/">FS</Link>
      </h2>
      <button onClick={handleNav}>
        <i className="fa-solid fa-bars sm:hidden sm:w-0 sm:h-0"></i>
      </button>
      <MobileNav nav={nav} handleNav={handleNav} />
      <Nav/>
    </header>
  );
}

export default Header;
