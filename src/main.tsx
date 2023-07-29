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
import CountryCompetitions from './pages/CountryCompetitions.tsx';
import {
  countryLoader,
  compLoader,
  teamLoader,
  playerLoader,
} from './utils/loaders.ts';
import Competition from './pages/Competition.tsx';
import TeamLayout from './pages/TeamLayout.tsx';
import Stats from './pages/Stats.tsx';
import Players from './pages/Players.tsx';
import Transfers from './pages/Transfers.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<App />} path="/">
        <Route element={<Home />} index />
        <Route element={<Competitions />} path="competitions">
          <Route element={<Countries />} index />
          <Route
            element={<CountryCompetitions />}
            path=":countryName"
            loader={countryLoader}
          />
          <Route
            element={<Competition />}
            path="comps/:compId"
            loader={compLoader}
          />
          <Route
            element={<Competition />}
            path="comps/:compId/:compSeason"
            loader={compLoader}
          />
        </Route>
        <Route
          element={<TeamLayout />}
          path="team/:compId/:teamId/:season"
          loader={teamLoader}
        >
          <Route element={<Stats />} index />
          <Route element={<Players />} path="players" loader={playerLoader} />
          <Route element={<Transfers />} path="transfers" />
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
