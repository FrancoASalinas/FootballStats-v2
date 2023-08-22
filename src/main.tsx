import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  Link,
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
  countriesLoader,
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
import Standings from './pages/Standings.tsx';
import TopScorers from './pages/TopScorers.tsx';
import TopsAssists from './pages/TopsAssists.tsx';
import FixtureLineup from './pages/FixtureLineup.tsx';
import { CustomBreadCrumbs } from './modules/Breadcrumbs.tsx';
import ErrorPage from './pages/ErrorPage.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        element={<App />}
        path="/"
        handle={{ crumb: () => <Link to="/">Home</Link> }}
        errorElement={<ErrorPage />}
      >
        <Route element={<Home />} index />
        <Route
          path="fixtures"
          element={<FixturesLayout />}
          handle={{ crumb: () => <Link to="/fixtures">Fixtures</Link> }}
        >
          <Route element={<LiveFixtures />} loader={liveFixturesLoader} index />
          <Route
            path=":fixtureId"
            element={<Fixture />}
            loader={fixtureLoader}
            handle={{
              crumb: (data: any) => (
                <Link to={`/fixtures/${data.fixture.response[0].fixture.id}`}>
                  {data.fixture.response[0].team.home.name} Vs.{' '}
                  {data.fixture.response[0].team.away.name}
                </Link>
              ),
            }}
          >
            <Route index element={<FixtureStats />} />
            <Route path="events" element={<FixtureEvents />} />
            <Route path="lineups" element={<FixtureLineup />} />
          </Route>
        </Route>
        <Route
          element={<Competitions />}
          path="countries"
          handle={{ crumb: () => <Link to="/countries">Countries</Link> }}
        >
          <Route element={<Countries />} index loader={countriesLoader} />
          <Route
            element={<CountryCompetitions />}
            path=":countryName"
            loader={countryLoader}
            handle={{
              crumb: (data: any) => (
                <Link to={`/countries/${data.response[0].country.name}`}>
                  {data.response[0].country.name}
                </Link>
              ),
            }}
          >
            <Route
              element={<Competition />}
              path=":compId/:compSeason"
              loader={compLoader}
              handle={{ crumb: () => <CustomBreadCrumbs /> }}
              id="comp"
            >
              <Route element={<Standings />} index />
              <Route element={<TopScorers />} path="topscorers" />
              <Route path="topassists" element={<TopsAssists />} />
            </Route>
          </Route>
        </Route>
        <Route
          element={<TeamLayout />}
          path="team/:compId/:teamId/:season"
          loader={teamLoader}
          handle={{
            crumb: (data: any) => (
              <Link
                to={`/team/${data.teamData.parameters.league}/${data.teamData.parameters.team}/${data.teamData.parameters.season}`}
              >
                {data.teamData.response.team.name}
              </Link>
            ),
          }}
        >
          <Route element={<Stats />} index />
          <Route element={<Players />} path="players" loader={squadLoader} />
          <Route
            element={<Transfers />}
            path="transfers"
          />
        </Route>
        <Route
          path="player/:playerId/:season"
          element={<Player />}
          loader={playerLoader}
          handle={{
            crumb: (data: any) => (
              <Link
                to={`player/${data.player.parameters.id}/${data.player.parameters.season}`}
              >
                {data.player.response[0].player.name}{' '}
                {data.player.parameters.season}
              </Link>
            ),
          }}
        />
      </Route>
      <Route element={<Welcome />} path="welcome" />
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
