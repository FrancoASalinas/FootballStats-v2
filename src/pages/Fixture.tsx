import {
  Link,
  Outlet,
  useLoaderData,
  useOutletContext,
} from 'react-router-dom';
import { Data } from '../utils/types';

type DataType = {
  fixtureStats: Data['fixtureStats'];
  fixture: Data['liveFixtures'];
};

function Fixture() {
  const { fixtureStats, fixture }: DataType = useLoaderData() as DataType;

  const fixtureResponse = fixture.response[0];

  return (
    <>
      <header className="text-2xl flex flex-wrap">
        <div className="flex gap-3 flex-wrap">
          <img src={fixtureResponse.teams.home.logo} className="w-12"></img>
          {fixtureResponse.teams.home.name} {fixtureResponse.goals.home} -
        </div>
        <div className="flex gap-3 flex-wrap">
          {fixtureResponse.goals.away} {fixtureResponse.teams.away.name}
          <img src={fixtureResponse.teams.away.logo} className="w-12"></img>
        </div>
      </header>
      <nav className="w-full p-5 text-xl flex justify-between">
        <Link to={`/fixtures/${fixture.parameters.id}`}>Stats</Link>
        <Link to="events">Events</Link>
      </nav>
      <article>
        <Outlet context={{ fixture, fixtureStats } as DataType} />
      </article>
    </>
  );
}

export function useFixture() {
  return useOutletContext<DataType>();
}

export default Fixture;
