import { useFixture } from './Fixture';

function FixtureStats() {
  const { fixtureStats } = useFixture();

  return (
    <>
      {fixtureStats.results > 0 ? (
        fixtureStats.response.map((item) => (
          <div key={item.team.id} className="border p-5 border-dark my-5 rounded-2xl flex flex-col gap-3">
            <div className="flex gap-3 text-xl mb-3 justify-between">
              <h3>{item.team.name}</h3>
              <img className="w-8" src={item.team.logo}></img>
            </div>
            <ul>
              {item.statistics.map(
                (statistic) =>
                  statistic.value && (
                    <li key={statistic.type}>
                      {statistic.type} - {statistic.value}
                    </li>
                  )
              )}
            </ul>
          </div>
        ))
      ) : (
        <p>There aren't available statistics for this match.</p>
      )}
    </>
  );
}

export default FixtureStats;
