import { useFixture } from './Fixture';

export default function FixtureLineup() {
  const { fixtureLineup } = useFixture();

  return (
    <>
      {fixtureLineup.response.map((team) => (
        <div className='my-10 border border-dark dark:border-light rounded-2xl'>
          <ul>
            <li className='p-5 text-xl'>
              Coach<li className='ml-2 text-base'>{team.coach.name}</li>
            </li>
            <li className='p-5 text-xl'>
              Starting XI{' '}
              <ul>
                {team.startXI.map((player) => (
                  <li className="flex justify-between ml-2 text-base">
                    {player.player.name}
                    {player.player.number}
                  </li>
                ))}
              </ul>
            </li>
            <li className='p-5 text-xl'>
              Substitutes
              <ul>
                {team.substitutes.map((player) => (
                  <li className="flex justify-between ml-2 text-base">
                    {player.player.name}
                    {player.player.number}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
}
