import {
  NavLink,
  Outlet,
  useLoaderData,
  useOutletContext,
} from 'react-router-dom';
import { Data } from '../utils/types';
import CustomNav from '../modules/CustomNav';

type DataType = {
  fixtureStats: Data['fixtureStats'];
  fixture: Data['liveFixtures'];
  fixtureLineup: Data['fixtureLineup'];
};

function Fixture() {
  const { fixtureStats, fixture, fixtureLineup }: DataType =
    useLoaderData() as DataType;

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
      <CustomNav>
      <NavLink to={location.pathname.split('/').length === 4  ? '' : location.pathname.split('/').slice(0, 4).join('/')} end className={({isActive}) =>  `p-2 text-sm ${isActive ? 'bg-light text-black' : ''} hover:underline text-center w-full rounded-l-lg rounded-bl-lg h-full `} >Stats</NavLink>
          <NavLink to='events' className={({isActive}) =>`p-2 text-sm ${isActive ? 'bg-light text-black' : ''} hover:underline text-center w-full h-full `} >Events</NavLink>
          <NavLink to='lineups' className={({isActive}) => `p-2 text-sm ${isActive ? 'bg-light text-black' : ''} hover:underline text-center w-full rounded-r-lg rounded-br-lg h-full `} >Lineups</NavLink>
      </CustomNav>
      <article>
        <Outlet
          context={{ fixture, fixtureStats, fixtureLineup } as DataType}
        />
      </article>
    </>
  );
}

export function useFixture() {
  return useOutletContext<DataType>();
}

export default Fixture;
