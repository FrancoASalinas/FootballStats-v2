const store = window.localStorage;

export const countriesLoader = async () => {
  interface Country {
    name: string;
  }

  if (!navigator.onLine || store.getItem('offline') !== null) {
    if (store.getItem('countries') !== null) {
      const offlineResponse = JSON.parse(store['countries']);
      offlineResponse.response = offlineResponse.response
        .filter(
          (country: any) =>
            localStorage.getItem(`${country.name}_comps`) !== null
        )
        .sort((a: Country, b: Country) => {
          if (a.name > b.name) {
            return +1;
          } else if (a.name < b.name) {
            return -1;
          } else return 0;
        });
      return offlineResponse;
    } else {
      throw new Error(
        "Looks like you are offline and we couldn't save this data"
      );
    }
  } else {
    const data = await fetch('https://v3.football.api-sports.io/countries', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': '1a3508246c26e132ec89913136f83975',
      },
    })
      .then((response) => {
        if (!response.ok) {
          if (store.getItem('countries') !== null) {
            store.getItem('countries');
          } else {
            throw new Error('Error retreiving data');
          }
        }

        return response.json();
      })
      .then((response) => {
        if (response.errors.length > 0) {
          if (store.getItem('countries')) {
            return JSON.parse(store['countries']);
          } else {
            throw new Error(response.errors[0]);
          }
        } else {
          store.setItem('countries', JSON.stringify(response));
          return response;
        }
      }).catch(err => {throw new Error(err)});

    return data
  }
};

export const countryLoader = async ({ params }: any) => {
  const { countryName } = params;

  if (!navigator.onLine || store.getItem('offline') !== null) {
    if (store.getItem(countryName + '_comps') !== null) {
      const offlineResponse = JSON.parse(store[countryName + '_comps']);
      offlineResponse.response = offlineResponse.response.filter(
        (comp: any) =>
          store.getItem(`seasonStandings_${comp.league.id}`) !== null
      );

      return offlineResponse;
    } else {
      throw new Error(
        "Looks like you are offline and we couldn't save this data"
      );
    }
  } else {
    const data = await fetch(
      `https://v3.football.api-sports.io/leagues?country=${countryName}`,
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
          return store.getItem(countryName + '_comps') !== null
            ? store.getItem(countryName + '_comps')
            : new Error('Error retreiving data');
        }

        return response.json();
      })
      .then((response) => {
        if (Object.values(response.errors).length > 0) {
          if (store.getItem(countryName + '_comps')) {
            return JSON.parse(store[countryName + '_comps']);
          } else {
            throw new Error(Object.values(response.errors as string)[0]);
          }
        } else {
          store.setItem(countryName + '_comps', JSON.stringify(response));
          return response;
        }
      });

    return data;
  }
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

  if (!navigator.onLine) {
    if (
      store.getItem(`team_${compId}_${teamId}_${season}`) &&
      store.getItem(`teamSeasons_${teamId}`) &&
      store.getItem(`transfers_${teamId}`)
    ) {
      const teamData = JSON.parse(store[`team_${compId}_${teamId}_${season}`]);
      const availableSeasons = JSON.parse(store[`teamSeasons_${teamId}`]);

      return { teamData, availableSeasons };
    }
    throw new Error(
      "Looks like you are offline and we couldn't save this data"
    );
  } else {
    const teamData = await fetch(
      `https://v3.football.api-sports.io/teams/statistics?league=${compId}&team=${teamId}&season=${season}`,
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
          if (store.getItem(`team_${compId}_${teamId}_${season}`) !== null) {
            return store.getItem(`team_${compId}_${teamId}_${season}`);
          } else {
            throw new Error('Error retreiving data');
          }
        }

        return response.json();
      })
      .then((response) => {
        if (response.errors.length > 0) {
          if (store.getItem(`team_${compId}_${teamId}_${season}`)) {
            return JSON.parse(store[`team_${compId}_${teamId}_${season}`]);
          } else {
            throw new Error(response.errors[0]);
          }
        } else {
          store.setItem(
            `team_${compId}_${teamId}_${season}`,
            JSON.stringify(response)
          );
          return response;
        }
      })
      .catch((error) => {
        throw new Error(error);
      });

    const availableSeasons = await fetch(
      `https://v3.football.api-sports.io/teams/seasons?team=${teamId}`,
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
          if (store.getItem(`teamSeasons_${teamId}`) !== null) {
            return store.getItem(`teamSeasons_${teamId}`);
          } else {
            throw new Error('Error retreiving data');
          }
        }

        return response.json();
      })
      .then((response) => {
        if (response.errors.length > 0) {
          if (store.getItem(`teamSeasons_${teamId}`)) {
            return JSON.parse(store[`teamSeasons_${teamId}`]);
          } else {
            throw new Error(response.errors[0]);
          }
        } else {
          store.setItem(`teamSeasons_${teamId}`, JSON.stringify(response));

          return response;
        }
      });

    return { teamData, availableSeasons };
  }
};

export const transfersLoader = async ({ params }: any) => {
  const { teamId } = params;

  if (!navigator.onLine || store.getItem('offline') !== null) {
    if (store.getItem(`transfers_${teamId}`)) {
      const transfers = JSON.parse(store[`transfers_${teamId}`]);

      return { transfers };
    }
    throw new Error(
      "Looks like you are offline and we couldn't save this data"
    );
  } else {
    const transfers = await fetch(
      `https://v3.football.api-sports.io/transfers/?team=${teamId}`,
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
          return store.getItem(`transfers_${teamId}`)
            ? store[`transfers_${teamId}`]
            : new Error('Error retrieving data');
        }
        return response.json();
      })
      .then((response) => {
        if (!response.ok) {
          return store.getItem(`transfers_${teamId}`) !== null
            ? store.getItem(`transfers_${teamId}`)
            : new Error('Error retreiving data');
        }

        return response.json();
      })
      .then((response) => {
        if (Object.values(response.errors).length > 0) {
          if (store.getItem(`transfers_${teamId}`)) {
            return JSON.parse(store[`transfers_${teamId}`]);
          } else {
            throw new Error(Object.values(response.errors as string)[0]);
          }
        } else {
          store.setItem(`transfers_${teamId}`, JSON.stringify(response));

          return response;
        }
      });

    return { transfers };
  }
};

export const squadLoader = async ({ params }: any) => {
  const { teamId } = params;

  if (!navigator.onLine) {
    if (store.getItem(`squad_${teamId}`)) {
      return store[`squad_${teamId}`];
    }
    throw new Error(
      "Looks like you are offline and we couldn't save this data"
    );
  } else {
    const squad = await fetch(
      `https://v3.football.api-sports.io/players/squads?team=${teamId}`,
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
          return store.getItem(`squad_${teamId}`) !== null
            ? store.getItem(`squad_${teamId}`)
            : new Error('Error retreiving data');
        }

        return response.json();
      })
      .then((response) => {
        if (response.errors.length > 0) {
          if (store.getItem(`squad_${teamId}`)) {
            return JSON.parse(store[`squad_${teamId}`]);
          } else {
            throw new Error(response.errors[0]);
          }
        } else {
          store.setItem(`squad_${teamId}`, JSON.stringify(response));
          return response;
        }
      });

    return { squad };
  }
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

  const fixtureStats = await fetch(
    `https://v3.football.api-sports.io/fixtures/statistics?fixture=${fixtureId}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': '1a3508246c26e132ec89913136f83975',
      },
    }
  ).then((response) => response.json());

  const fixture = await fetch(
    `https://v3.football.api-sports.io/fixtures?id=${fixtureId}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': '1a3508246c26e132ec89913136f83975',
      },
    }
  ).then((response) => response.json());

  const fixtureLineup = await fetch(
    `https://v3.football.api-sports.io/fixtures/lineups?fixture=${fixtureId}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': '1a3508246c26e132ec89913136f83975',
      },
    }
  ).then((response) => response.json());

  return { fixtureStats, fixture, fixtureLineup };
};
