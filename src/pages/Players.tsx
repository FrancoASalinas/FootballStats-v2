import { Link, useLoaderData } from 'react-router-dom';
import { Squad } from '../utils/types';

function Players() {
  const { squad }: Squad = useLoaderData() as any;

  return (
    <>
      {squad.response[0].players.map((player) => (
        <div key={player.id} className="rounded-xl border border-dark p-3 my-3">
          <h3>
            <Link to={`/FootballStats-v2/player/${player.id}/season`}>
              {player.name} - {player.number}
            </Link>
          </h3>
          <span>{player.position}</span>
        </div>
      ))}
    </>
  );
}

export default Players;
