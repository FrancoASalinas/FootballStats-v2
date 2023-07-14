import { Outlet } from 'react-router-dom';
import Header from '../modules/Header';
import { useState } from 'react';

function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  function toggleTheme() {
    setDarkTheme((prev) => !prev);
  }

  console.log(window.localStorage);

  console.log(document.documentElement);

  console.log(darkTheme);

  return (
    <>
      <Header onChange={toggleTheme} darkTheme={darkTheme} />
      <main className="bg-light font-roboto mt-20 min-h-screen">
        <Outlet />
      </main>
    </>
  );
}

export default App;
