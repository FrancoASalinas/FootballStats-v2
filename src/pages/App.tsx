import { Outlet } from 'react-router-dom';
import Header from '../modules/Header';
import { useEffect, useState } from 'react';

function App() {
  // const [darkTheme, setDarkTheme] = useState<boolean | undefined>();

  // function handleTheme() {
  //   if(darkTheme !== undefined)
  //   {setDarkTheme((prev) => !prev)}
  //   else{
  //     setDarkTheme(true)
  //   }
  // }

  // useEffect(() => {
  //    if (darkTheme === true ||
  //     localStorage.theme === 'dark' ||
  //     (!('theme' in localStorage) &&
  //       window.matchMedia('(prefers-color-scheme: dark)').matches)
  //   ) {
  //     document.documentElement.classList.add('dark');
  //     setDarkTheme(true)
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //     setDarkTheme(false)
  //   }
  // });

  return (
    <>
      <Header />
      <main className="bg-dark mt-20">
        <Outlet />
      </main>
    </>
  );
}

export default App;
