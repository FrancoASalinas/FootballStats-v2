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
          <tr>
            <th className="text-left text-dark pl-5 font-normal" colSpan={4}>
              Fixtures
            </th>
          </tr>
          <tr>
            <th className="border border-dark">Games played</th>
            {Object.values(teamData.response.fixtures.played).map((value) => (
              <td key={value + 1} className="border border-dark">
                {value}
              </td>
            ))}
          </tr>
          <tr>
            <th className="border border-dark">Wins</th>
            {Object.values(teamData.response.fixtures.wins).map((value) => (
              <td key={value + 2} className="border border-dark">
                {value}
              </td>
            ))}
          </tr>
          <tr>
            <th className="border border-dark">Loses</th>
            {Object.values(teamData.response.fixtures.loses).map((value) => (
              <td key={value + 3} className="border border-dark">
                {value}
              </td>
            ))}
          </tr>
          <tr>
            <th className="border border-dark">Draws</th>
            {Object.values(teamData.response.fixtures.draws).map((value) => (
              <td key={value + 4} className="border border-dark">
                {value}
              </td>
            ))}
          </tr>
        </tbody>
        <tbody className="">
          <tr className="w-full">
            <th className="text-left text-dark pl-5 font-normal" colSpan={4}>
              Goals
            </th>
          </tr>
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
