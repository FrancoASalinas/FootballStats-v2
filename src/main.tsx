import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Welcome from './pages/Welcome.tsx';
import Home from './pages/Home.tsx';
import App from './pages/App.tsx';
import Competitions from './pages/Competitions.tsx';
import Countries from './pages/Countries.tsx';
import CountryTeams from './pages/CountryTeams.tsx';
import { countryLoader } from './utils/loaders.ts';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<App />} path="/">
        <Route element={<Home />} index />
        <Route element={<Competitions />} path="competitions" />
        <Route element={<Countries />} path="countries" />
        <Route
          element={<CountryTeams />}
          path=":countryName"
          loader={countryLoader}
        />
        <Route />
      </Route>
      <Route element={<Welcome />} path="/welcome" />
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
