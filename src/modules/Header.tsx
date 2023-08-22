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
        <Bars />
      </button>
      <MobileNav nav={nav} handleNav={handleNav} />
      <Nav/>
    </header>
  );
}

const Bars = () => <svg className='sm:w-0 sm:h-0 sm:hidden' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>

export default Header;
