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
  }