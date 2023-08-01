import { useLoaderData } from 'react-router-dom';
import { Squad } from '../utils/types';

function Players() {
  const { squad }: Squad = useLoaderData() as any;
  console.log(squad);
  return (
    <>
      {squad.response[0].players.map((player) => (
        <div key={player.id} className="rounded-xl border border-dark p-3 my-3">
          <h3>
            {player.name} - {player.number}
          </h3>
          <span>{player.position}</span>
        </div>
      ))}
    </>
  );
}

export default Players;
