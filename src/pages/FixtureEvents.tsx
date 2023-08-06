import { useFixture } from './Fixture';

function FixtureEvents() {
  const { fixture } = useFixture();

  return (
    <>
      {fixture.response[0].events.length > 0 ? (
        <ul className="divide-y divide-dark p-5">
          {fixture.response[0].events.map((event, index) => (
            <li key={event.time.elapsed + index}>
              {event.time.elapsed}m - {event.team.name} ({event.type})
              <p className="">
                {event.player.name} - {event.detail}{' '}
                {event.comments && '-' + event.comments}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>There aren't available events for this match.</p>
      )}
    </>
  );
}

export default FixtureEvents;
