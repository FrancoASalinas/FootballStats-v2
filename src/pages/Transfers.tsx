import { useTeamData } from './TeamLayout';

function Transfers() {
  const { transfers, teamData } = useTeamData();

  return (
    <>
      {transfers.response
        .filter((item) =>
          item.transfers[0].date.includes(teamData.parameters.season)
        )
        .map((item) => (
          <div
            key={item.player.name}
            className="p-3 border rounded-xl border-dark my-3"
          >
            <h3>{item.player.name}</h3>
            {item.transfers
              .filter((transfer) =>
                transfer.date.includes(teamData.parameters.season)
              )
              .map((transfer, index) => {
                console.log(transfer);
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
          </div>
        ))}
    </>
  );
}

export default Transfers;
