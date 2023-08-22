import { Outlet } from 'react-router-dom';
import Header from '../modules/Header';
import Breadcrumbs from '../modules/Breadcrumbs';

function App() {
  return (
    <>
      <Header />
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
