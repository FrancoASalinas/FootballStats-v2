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
import { countryLoader, teamLoader } from './utils/loaders.ts';
import Team from './pages/Team.tsx';
import TeamLayout from './pages/TeamLayout.tsx';

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
        <Route element={<TeamLayout />} path="team">
          <Route element={<Team />} path=":teamId" loader={teamLoader} />
        </Route>
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
