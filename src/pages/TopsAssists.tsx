import { useCompetitionContext } from "./Competition";

function TopsAssists() {
    const {topAssists} = useCompetitionContext();

    return (  <table>
        <thead>
            <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Goals</th>
                <th>Appearences</th>
            </tr>
        </thead>
        <tbody>
            {topAssists.response.map((player, index) => 
               <tr>
                <td>{index + 1}</td>
                <td>{player.player.name}</td>
                <td>{player.statistics[0].goals.total}</td>
                <td>{player.statistics[0].games.appearences}</td>
               </tr> )}
        </tbody>
    </table> );
}

export default TopsAssists;