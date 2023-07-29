export interface Data {
    teamData: {
      response: {
        fixtures: {
            played: {home: number; away: number; total: number};
            wins: {home: number; away: number; total: number};
            loses: {home: number; away: number; total: number}
            draws: {home: number; away: number; total: number}
        };
        goals: {
            for: {total: string};
            against: {total: string};
        }
        team: { name: string; logo: string };
        league: { name: string };
      };
      parameters: { season: string; league: string };
    };
    availableSeasons: {
      response: number[];
      parameters: { team: string };
    };
    transfers: {
        response: [{
          player: {id: number; name: string}; transfers: [{
            date: string; type: string;
           teams: {
            in: {name: string};
            out: {name: string}}
        }]
        }]
    }
  }

  export interface Squad {
    squad: {

      response: [{players: [
        {name: string; id: number; number: number; position: string; photo: string}
      ]}]
    }
  }