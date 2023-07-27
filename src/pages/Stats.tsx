import { useTeamData } from './TeamLayout';

function Stats() {
  const { teamData } = useTeamData();

  console.log(teamData);

  return (
    <>
      <table className="w-full text-center border mb-10 border-dark">
        <thead>
          <tr>
            <th className="border border-dark"></th>
            <th className="border border-dark">Home</th>
            <th className="border border-dark">Away</th>
            <th className="border border-dark">All</th>
          </tr>
        </thead>
        <tbody className="">
          <caption>Fixtures</caption>
          <tr>
            <th className="border border-dark">Games played</th>
            {Object.values(teamData.response.fixtures.played).map((value) => (
              <td className="border border-dark">{value}</td>
            ))}
          </tr>
          <tr>
            <th className="border border-dark">Wins</th>
            {Object.values(teamData.response.fixtures.wins).map((values) => (
              <td className="border border-dark">{values}</td>
            ))}
          </tr>
          <tr>
            <th className="border border-dark">Loses</th>
            {Object.values(teamData.response.fixtures.loses).map((values) => (
              <td className="border border-dark">{values}</td>
            ))}
          </tr>
          <tr>
            <th className="border border-dark">Draws</th>
            {Object.values(teamData.response.fixtures.draws).map((values) => (
              <td className="border border-dark">{values}</td>
            ))}
          </tr>
        </tbody>
        <tbody className="">
          <caption>Goals</caption>
          <tr>
            <th>For</th>
            {Object.values(teamData.response.goals.for.total).map((value) => (
              <td>{value}</td>
            ))}
          </tr>
          <tr>
            <th>Against</th>
            {Object.values(teamData.response.goals.against.total).map(
              (value) => (
                <td>{value}</td>
              )
            )}
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Stats;
