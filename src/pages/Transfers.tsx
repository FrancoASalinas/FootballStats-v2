import Dropdown from '../modules/Dropdown';
import { Data } from '../utils/types';
import { useTeamData } from './TeamLayout';

function Transfers() {
  const { teamData, transfers }: Data = useTeamData();

  return (
    <>
      {transfers.response
        .filter((item) =>
          item.transfers[0].date.includes(teamData.parameters.season)
        )
        .map((item) => (
          <Dropdown key={item.player.name} title={item.player.name}>
            {item.transfers
              .filter((transfer) =>
                transfer.date.includes(teamData.parameters.season)
              )
              .map((transfer, index) => {
                return (
                  <div
                    key={item.player.name + index}
                    className="flex flex-col p-2"
                  >
                    <h4>
                      {transfer.type} - {transfer.date}
                    </h4>
                    <span>From: {transfer.teams.out.name}</span>
                    <span>To: {transfer.teams.in.name}</span>
                  </div>
                );
              })}
          </Dropdown>
        ))}
    </>
  );
}

export default Transfers;
