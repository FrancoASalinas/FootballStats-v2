import { Outlet } from 'react-router-dom';
import Header from '../modules/Header';
import useDarkTheme from '../utils/useDarkTheme';
import Breadcrumbs from '../modules/Breadcrumbs';

function App() {
  const [darkTheme, setDarkTheme] = useDarkTheme();

  function toggleTheme() {
    setDarkTheme((prev) => !prev);
  }

  return (
    <>
      <Header onChange={toggleTheme} darkTheme={darkTheme} />
      <main className="bg-light font-roboto p-5 min-h-screen dark:bg-dark dark:text-light">
        <div className="mt-20">
          <Breadcrumbs />
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default App;
