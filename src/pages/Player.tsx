import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import LayoutHeader from '../modules/LayoutHeader';
import { Data } from '../utils/types';
import { useEffect, useState } from 'react';
import useFavoriteData, { dataIsFavorite } from '../utils/useFavoriteData';
import CustomSelect from '../modules/CustomSelect';

function Player() {
  const { player, availableSeasons }: Data = useLoaderData() as any;
  const location = useLocation();
  const playerData = player.response[0].player;
  const playerStatistics = player.response[0].statistics;
  const navigate = useNavigate();

  const [favorite, setFavorite] = useState(
    dataIsFavorite('player_' + playerData.name + '_fav')
  );
  console.log(player);

  useEffect(() => {
    favorite
      ? useFavoriteData(
          'player_' + playerData.name + '_fav',
          'add',
          JSON.stringify([playerData.name, location.pathname])
        )
      : useFavoriteData('player_' + playerData.name + '_fav', 'remove');
  }, []);

  return (
    <>
      <LayoutHeader
        name={playerData.name}
        src={playerData.photo}
        favorite
        isFavorite={favorite}
        onClick={() => setFavorite((prev) => !prev)}
      />
      <article>
        <div className="flex justify-between">
          <ul>
            <li>
              Full name: {`${playerData.firstname} ${playerData.lastname}`}
            </li>
            <li>Age: {playerData.age}</li>
            <li>Height: {playerData.height}</li>
            <li>Weight: {playerData.weight}</li>
            <li>Nationality: {playerData.nationality}</li>
          </ul>
          <label>
            Season
            <CustomSelect
              defaultValue={player.parameters.season}
              onChange={(e: any) =>
                navigate(`/player/${player.parameters.id}/${e.target.value}`)
              }
            >
              {availableSeasons.response.map((season) => (
                <option>{season}</option>
              ))}
            </CustomSelect>
          </label>
        </div>
        <div className="border border-b-dark w-full my-3"></div>
        {playerStatistics.map((statistic, index: number) => (
          <section
            className="border border-dark rounded-xl p-3 my-3 space-y-3"
            key={statistic.team.name + index}
          >
            <h3 className="text-2xl">{statistic.team.name}</h3>
            {
              <div>
                <h4 className="text-xl">Cards</h4>
                <ul>
                  <li>Yellow: {statistic.cards.yellow}</li>
                  <li>Red: {statistic.cards.red}</li>
                </ul>
              </div>
            }
            {statistic.dribbles.attempts && (
              <div>
                <h4 className="text-xl">Dribbles</h4>
                <ul>
                  <li>Attempts: {statistic.dribbles.attempts}</li>
                  <li>Success: {statistic.dribbles.success}</li>
                  <li>Past: {statistic.dribbles.past}</li>
                </ul>
              </div>
            )}
            {statistic.duels.total && (
              <div>
                <h4 className="text-xl">Duels</h4>
                <ul>
                  <li>Total: {statistic.duels.total}</li>
                  <li>Won: {statistic.duels.won}</li>
                </ul>
              </div>
            )}
            {statistic.games.appareances ? (
              <div>
                <h4 className="text-xl">Games</h4>
                <ul>
                  <li>Appearances: {statistic.games.appareances}</li>
                  <li>Lineups: {statistic.games.lineups}</li>
                  <li>Minutes: {statistic.games.minutes}</li>
                  <li>Position: {statistic.games.position}</li>
                  <li>Rating: {statistic.games.rating}</li>
                </ul>
              </div>
            ) : (
              <div>
                <ul>
                  <li>{statistic.games.position}</li>
                </ul>
              </div>
            )}
            {(statistic.goals.total || statistic.goals.saved) && (
              <div>
                <h4 className="text-xl">Goals</h4>
                <ul>
                  <li>Assists: {statistic.goals.assists}</li>
                  <li>Conceded: {statistic.goals.conceded}</li>
                  <li>Saved: {statistic.goals.saved}</li>
                  <li>Total: {statistic.goals.total}</li>
                </ul>
              </div>
            )}
            {statistic.passes.total && (
              <div>
                <h4 className="text-xl">Passes</h4>
                <ul>
                  <li>Total: {statistic.passes.total}</li>
                  <li>Key passes: {statistic.passes.key}</li>
                  <li>Accuracy: {statistic.passes.accuracy}</li>
                </ul>
              </div>
            )}
            {Object.values(statistic.penalty).some((item) => item !== null) && (
              <div>
                <h4 className="text-xl">Penalties</h4>
                <ul>
                  <li>Commited: {statistic.penalty.commited}</li>
                  <li>Missed: {statistic.penalty.missed}</li>
                  <li>Saved: {statistic.penalty.saved}</li>
                  <li>Scored: {statistic.penalty.scored}</li>
                  <li>Won: {statistic.penalty.won}</li>
                </ul>
              </div>
            )}
            {statistic.shots.total && (
              <div>
                <h4 className="text-xl">Shots</h4>
                <ul>
                  <li>Total: {statistic.shots.total}</li>
                  <li>On: {statistic.shots.on}</li>
                </ul>
              </div>
            )}
            {statistic.tackles.total && (
              <div>
                <h4 className="text-xl">Tackles</h4>
                <ul>
                  <li>Total: {statistic.tackles.total}</li>
                  <li>Blocks: {statistic.tackles.blocks}</li>
                  <li>Interceptions: {statistic.tackles.interceptions}</li>
                </ul>
              </div>
            )}
            <div></div>
          </section>
        ))}
      </article>
    </>
  );
}

export default Player;
