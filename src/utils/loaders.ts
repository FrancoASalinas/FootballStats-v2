import { fetchBoilerplate, simpleFetchBoilerplate } from "./boilerplates";

const store = window.localStorage;

export const countriesLoader = async () => {
  const data = await fetchBoilerplate(
    ['countries'],
    [
      {
        url: 'https://v3.football.api-sports.io/countries',
        reference: 'countries',
      },
    ]
  );

  return data[0];
};

export const countryLoader = async ({ params }: any) => {
  const { countryName } = params;

  const data = await fetchBoilerplate(
    [countryName + '_comps'],
    [
      {
        url: `https://v3.football.api-sports.io/leagues?country=${countryName}`,
        reference: countryName + '_comps',
      },
    ]
  );

  return data[0];
};

export const compLoader = async ({ params }: any) => {
  const { compId, compSeason } = params;

  const storeSeasons = 'availableSeasons_' + compId;
  const storeStandings =
    'seasonStandings_' +
    compId +
    (compSeason === 'season' ? '' : `&${compSeason}`);
  const storeTopScorers =
    'topScorers_' + compId + compSeason === 'season' ? '' : compSeason;
  const storeTopAssists =
    'topAssists_' + compId + compSeason === 'season' ? '' : compSeason;

  if (!navigator.onLine || localStorage.offline) {
    if (
      store.getItem(storeSeasons) !== null &&
      store.getItem(storeStandings) !== null &&
      store.getItem(storeTopScorers) &&
      store.getItem(storeTopAssists)
    ) {
      const availableCompSeasons = JSON.parse(store[storeSeasons]);
      const currentSeasonStandings = JSON.parse(store[storeStandings]);
      const topScorers = JSON.parse(store[storeTopScorers]);
      const topAssists = JSON.parse(store[storeTopAssists]);
      return {
        availableCompSeasons,
        currentSeasonStandings,
        topScorers,
        topAssists,
      };
    }
    throw new Error(
      "Looks like you are offline and we couldn't save this data"
    );
  } else {
    let currentSeasonStandings: any;

    const availableCompSeasons: any = await fetch(
      `https://v3.football.api-sports.io/leagues?id=${compId}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': '1a3508246c26e132ec89913136f83975',
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          return store.getItem(availableCompSeasons) !== null
            ? store.getItem(storeSeasons)
            : new Error('Error retrieving data');
        }

        return response.json();
      })
      .then((response) => {
        if (Object.values(response.errors).length > 0) {
          if (store.getItem(storeSeasons)) {
            return JSON.parse(store[storeSeasons]);
          } else {
            throw new Error(Object.values(response.errors as string)[0]);
          }
        } else {
          store.setItem(storeSeasons, JSON.stringify(response));

          return response;
        }
      })
      .catch((error) => {
        throw new Error(error);
      });

    currentSeasonStandings = await fetch(
      `${
        compSeason === 'season'
          ? `https://v3.football.api-sports.io/standings?league=${compId}&season=${
              availableCompSeasons.response[0].seasons.filter(
                (season: { current: boolean }) => season.current === true
              )[0].year
            }`
          : `https://v3.football.api-sports.io/standings?league=${compId}&season=${compSeason}`
      }`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': '1a3508246c26e132ec89913136f83975',
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          return store.getItem(currentSeasonStandings) !== null
            ? store.getItem(
                'seasonStandings_' +
                  compId +
                  (compSeason ? `&${compSeason}` : '')
              )
            : new Error('Error retreiving data');
        }

        return response.json();
      })
      .then((response) => {
        if (Object.values(response.errors).length > 0) {
          if (store.getItem(storeStandings)) {
            return JSON.parse(
              store[
                'seasonStandings_' +
                  compId +
                  (compSeason === 'season' ? '' : `&${compSeason}`)
              ]
            );
          } else {
            throw new Error(Object.values(response.errors as string)[0]);
          }
        } else {
          store.setItem(storeStandings, JSON.stringify(response));

          return response;
        }
      });

    const topScorers = await fetch(
      `${
        compSeason === 'season'
          ? `https://v3.football.api-sports.io/players/topscorers?season=${
              availableCompSeasons.response[0].seasons.filter(
                (season: { current: boolean }) => season.current === true
              )[0].year
            }&league=${compId}`
          : `https://v3.football.api-sports.io/players/topscorers?season=${compSeason}&league=${compId}`
      }`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': '1a3508246c26e132ec89913136f83975',
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          return store.getItem(storeTopScorers) !== null
            ? store.getItem(storeTopScorers)
            : new Error('Error retreiving data');
        }

        return response.json();
      })
      .then((response) => {
        if (Object.values(response.errors).length > 0) {
          if (store.getItem(storeTopScorers)) {
            return JSON.parse(
              store[
                'seasonStandings_' +
                  compId +
                  (compSeason === 'season' ? '' : `&${compSeason}`)
              ]
            );
          } else {
            throw new Error(Object.values(response.errors as string)[0]);
          }
        } else {
          store.setItem(storeTopScorers, JSON.stringify(response));

          return response;
        }
      });

    const topAssists = await fetch(
      `${
        compSeason === 'season'
          ? `https://v3.football.api-sports.io/players/topassists?season=${
              availableCompSeasons.response[0].seasons.filter(
                (season: { current: boolean }) => season.current === true
              )[0].year
            }&league=${compId}`
          : `https://v3.football.api-sports.io/players/topassists?season=${compSeason}&league=${compId}`
      }`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': '1a3508246c26e132ec89913136f83975',
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          return store.getItem(storeTopAssists) !== null
            ? store.getItem(storeTopAssists)
            : new Error('Error retreiving data');
        }

        return response.json();
      })
      .then((response) => {
        if (Object.values(response.errors).length > 0) {
          if (store.getItem(storeTopAssists)) {
            return JSON.parse(
              store[
                'seasonStandings_' +
                  compId +
                  (compSeason === 'season' ? '' : `&${compSeason}`)
              ]
            );
          } else {
            throw new Error(Object.values(response.errors as string)[0]);
          }
        } else {
          store.setItem(storeTopAssists, JSON.stringify(response));

          return response;
        }
      });

    return {
      availableCompSeasons,
      currentSeasonStandings,
      topScorers,
      topAssists,
    };
  }
};

export const teamLoader = async ({ params }: any) => {
  const { compId, teamId, season } = params;

  const team = `team_${compId}_${teamId}_${season}`;
  const teamSeasons = `teamSeasons_${teamId}`;

  const data = await fetchBoilerplate(
    [team, teamSeasons],
    [
      {
        url: `https://v3.football.api-sports.io/teams/statistics?league=${compId}&team=${teamId}&season=${season}`,
        reference: team,
      },
      {
        url: `https://v3.football.api-sports.io/teams/seasons?team=${teamId}`,
        reference: teamSeasons,
      },
    ]
  );

  const teamData = data[0];
  const availableSeasons = data[1];

  return { teamData, availableSeasons };
};

export const transfersLoader = async ({ params }: any) => {
  const { teamId } = params;

  const transfer = `transfers_${teamId}`;

  const data = await fetchBoilerplate(
    [transfer],
    [
      {
        url: `https://v3.football.api-sports.io/transfers/?team=${teamId}`,
        reference: transfer,
      },
    ]
  );

  const transfers = data[0];

  return { transfers };
};

export const squadLoader = async ({ params }: any) => {
  const { teamId } = params;

  const squadRef = `squad_${teamId}`;

  const data = await fetchBoilerplate(
    [squadRef],
    [
      {
        url: `https://v3.football.api-sports.io/players/squads?team=${teamId}`,
        reference: squadRef,
      },
    ]
  );

  const squad = data[0];

  return { squad };
};

export const playerLoader = async ({ params }: any) => {
  const { playerId, season } = params;

  if (!navigator.onLine) {
    if (
      store.getItem(`playerSeasons_${playerId}`) &&
      store.getItem(
        season === 'season'
          ? `player_${playerId}`
          : `player_${playerId}_${season}`
      )
    ) {
      const availableSeasons = JSON.parse(store[`playerSeasons_${playerId}`]);
      const player = JSON.parse(
        store[
          season === 'season'
            ? `player_${playerId}`
            : `player_${playerId}_${season}`
        ]
      );

      return { player, availableSeasons };
    }
    throw new Error(
      "Looks like you are offline and we couldn't save this data"
    );
  } else {
    const availableSeasons = await fetch(
      `https://v3.football.api-sports.io/players/seasons?player=${playerId}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': '1a3508246c26e132ec89913136f83975',
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          if (store.getItem(`playerSeasons_${playerId}`) !== null) {
            store.getItem(`playerSeasons_${playerId}`);
          } else {
            throw new Error('Error retreiving data');
          }
        }

        return response.json();
      })
      .then((response) => {
        if (response.errors.length > 0) {
          if (store.getItem(`playerSeasons_${playerId}`)) {
            return JSON.parse(store[`playerSeasons_${playerId}`]);
          } else {
            throw new Error(response.errors[0]);
          }
        } else {
          store.setItem(`playerSeasons_${playerId}`, JSON.stringify(response));
          return response;
        }
      })
      .catch((error) => {
        throw Error(error);
      });

    const player = await fetch(
      season === 'season'
        ? `https://v3.football.api-sports.io/players?id=${playerId}&season=${availableSeasons.response.slice(
            -1
          )}`
        : `https://v3.football.api-sports.io/players?id=${playerId}&season=${season}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': '1a3508246c26e132ec89913136f83975',
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          return store.getItem(
            season === 'season'
              ? `player_${playerId}`
              : `player_${playerId}_${season}`
          ) !== null
            ? store.getItem(
                season === 'season'
                  ? `player_${playerId}`
                  : `player_${playerId}_${season}`
              )
            : new Error('Error retreiving data');
        }

        return response.json();
      })
      .then((response) => {
        if (response.errors.length > 0) {
          if (
            store.getItem(
              season === 'season'
                ? `player_${playerId}`
                : `player_${playerId}_${season}`
            )
          ) {
            return JSON.parse(
              store[
                season === 'season'
                  ? `player_${playerId}`
                  : `player_${playerId}_${season}`
              ]
            );
          } else {
            throw new Error(response.errors[0]);
          }
        } else {
          store.setItem(
            season === 'season'
              ? `player_${playerId}`
              : `player_${playerId}_${season}`,
            JSON.stringify(response)
          );
          return response;
        }
      });

    return { player, availableSeasons };
  }
};

export const liveFixturesLoader = async () => {
  const liveFixtures = await fetch(
    `https://v3.football.api-sports.io/fixtures?live=all`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': '1a3508246c26e132ec89913136f83975',
      },
    }
  ).then((response) => response.json());

  return { liveFixtures };
};

export const fixtureLoader = async ({ params }: any) => {
  const { fixtureId } = params;

  const data = await simpleFetchBoilerplate([`https://v3.football.api-sports.io/fixtures/statistics?fixture=${fixtureId}`, `https://v3.football.api-sports.io/fixtures?id=${fixtureId}`, `https://v3.football.api-sports.io/fixtures/lineups?fixture=${fixtureId}`])

  const fixtureStats = data[0];
  const fixture = data[1];
  const fixtureLineup = data[2];

  return { fixtureStats, fixture, fixtureLineup };
};
