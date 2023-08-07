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
  squadLoader,
  liveFixturesLoader,
  fixtureLoader,
} from './utils/loaders.ts';
import Competition from './pages/Competition.tsx';
import TeamLayout from './pages/TeamLayout.tsx';
import Stats from './pages/Stats.tsx';
import Players from './pages/Players.tsx';
import Transfers from './pages/Transfers.tsx';
import Player from './pages/Player.tsx';
import LiveFixtures from './pages/LiveFixtures.tsx';
import Fixture from './pages/Fixture.tsx';
import FixturesLayout from './pages/FixturesLayout.tsx';
import FixtureEvents from './pages/FixtureEvents.tsx';
import FixtureStats from './pages/FixtureStats.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<App />} path="/">
        <Route element={<Home />} index />
        <Route path="fixtures" element={<FixturesLayout />}>
          <Route element={<LiveFixtures />} loader={liveFixturesLoader} index />
          <Route path=":fixtureId" element={<Fixture />} loader={fixtureLoader}>
            <Route index element={<FixtureStats />} />
            <Route path="events" element={<FixtureEvents />} />
          </Route>
        </Route>
        <Route element={<Competitions />} path="countries">
          <Route element={<Countries />} index />
          <Route
            element={<CountryCompetitions />}
            path=":countryName"
            loader={countryLoader}
          >
            <Route
              element={<Competition />}
              path=":compId"
              loader={compLoader}
            />
            <Route
              element={<Competition />}
              path=":compId/:compSeason"
              loader={compLoader}
            />
          </Route>
        </Route>
        <Route
          element={<TeamLayout />}
          path="team/:compId/:teamId/:season"
          loader={teamLoader}
        >
          <Route element={<Stats />} index />
          <Route element={<Players />} path="players" loader={squadLoader} />
          <Route element={<Transfers />} path="transfers" />
        </Route>
        <Route
          path="player/:playerId/:season"
          element={<Player />}
          loader={playerLoader}
        />
        <Route element={<Welcome />} path="welcome" />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
