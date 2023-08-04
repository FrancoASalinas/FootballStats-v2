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
    player: {
      parameters: {season: string, id: number}
      response: 
        [{player: {name: string, photo: string, firstname: string; lastname:string; age: number,  height: string; weight: number; nationality: string}, statistics: [{
          cards: {yellow: number; red: number};team: {name: string};
           dribbles: {attempts: number | null; success: number; past: number};
           duels: {total: number; won: number};
           games: {appareances: number; lineups: number; minutes: number; position: string; rating: string};
           goals: {assists: number; conceded: number; saved: number; total: number | null};
           passes: {total: number | null; key: number; accuracy: number};
           penalty: {commited: number; missed: number; saved: number; scored: number; won: number};
           shots: {total: number | null; on: number};
           tackles: {total: null | number; blocks: number; interceptions: number}

}]}]
    }
  }

  export interface Squad {
    squad: {

      response: [{players: [
        {name: string; id: number; number: number; position: string; photo: string}
      ]}]
    }
  }