
const store = window.localStorage

export const countryLoader = async ({params}: any) => {

    const {countryName} = params;

    if(!navigator.onLine || store.getItem('offline') !== null){
        if(store.getItem(countryName + '_comps') !== null){
            const offlineResponse = JSON.parse(store[countryName + '_comps']);
            offlineResponse.response = offlineResponse.response.filter((comp: any) => store.getItem(`seasonStandings_${comp.league.id}`) !== null );

           return offlineResponse
        } else {
            throw new Error('Looks like you are offline and we couldn\'t save this data')
        }
    } else {

        
        const data = await fetch(`https://v3.football.api-sports.io/leagues?country=${countryName}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": '1a3508246c26e132ec89913136f83975'
	}
})
.then(response => {
    if(!response.ok){
        return store.getItem(countryName + '_comps') !== null ? store.getItem(countryName + '_comps') : new Error('Error retreiving data')
    } 
        
        return response.json()
}).then(response => {
    store.setItem(countryName + '_comps', JSON.stringify(response))

    return response
}
)

return data
}
}

export const compLoader = async ({params}: any) => {

    const {compId, compSeason} = params;
    
    if(!navigator.onLine){
        if(store.getItem('availableSeasons_' + compId) !== null && store.getItem('seasonStandings_' + compId + (compSeason ? `&${compSeason}` : '')) !== null){
            const availableSeasons = JSON.parse(store['availableSeasons_' + compId]); 
            const currentSeasonStandings = JSON.parse(store['seasonStandings_' + compId + (compSeason ? `&${compSeason}` : '')]);

            return {availableSeasons, currentSeasonStandings}
        }
        throw new Error('Looks like you are offline and we couldn\'t save this data');
    } else{
       
        let currentSeasonStandings: any;

    const  availableSeasons: any = await fetch(`https://v3.football.api-sports.io/leagues?id=${compId}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": '1a3508246c26e132ec89913136f83975'
        }
    }).then(response => {
        if(!response.ok){
            return store.getItem(availableSeasons) !== null ? store.getItem('availableSeasons_' + compId) : new Error('Error retrieving data')
        } 
            
            return response.json()
    }).then(response => {
        store.setItem('availableSeasons_' + compId, JSON.stringify(response))
    
        return response
    }
    )
    
          currentSeasonStandings = await fetch(
            `${compSeason ? `https://v3.football.api-sports.io/standings?league=${compId}&season=${compSeason}` : `https://v3.football.api-sports.io/standings?league=${compId}&season=${availableSeasons.response[0].seasons.filter((season: {current: boolean}) => season.current === true)[0].year}` }`, {
              "method": "GET",
              "headers": {
                  "x-rapidapi-host": "v3.football.api-sports.io",
                  "x-rapidapi-key": '1a3508246c26e132ec89913136f83975'
                }
            }).then(response => {
                if(!response.ok){
                    return store.getItem(currentSeasonStandings) !== null ? store.getItem('seasonStandings_' + compId + (compSeason ? `&${compSeason}` : '')) : new Error('Error retreiving data')
                } 
                    
                    return response.json()
            }).then(response => {
                store.setItem('seasonStandings_' + compId + (compSeason ? `&${compSeason}` : ''), JSON.stringify(response))
            
                return response
            }
            )
    
    return {availableSeasons, currentSeasonStandings} 
    }
}

export const teamLoader = async ({params}: any) => {

    const {compId, teamId, season} = params;

    if(!navigator.onLine){
        if(store.getItem(`team_${compId}_${teamId}_${season}`) && store.getItem(`teamSeasons_${teamId}`) && store.getItem(`transfers_${teamId}`)){
            const teamData = JSON.parse(store[`team_${compId}_${teamId}_${season}`]);
            const availableSeasons = JSON.parse(store[`teamSeasons_${teamId}`]);

            return {teamData, availableSeasons};
        }
        throw new Error('Looks like you are offline and we couldn\'t save this data')
    } else {
       
        const teamData = await fetch(`https://v3.football.api-sports.io/teams/statistics?league=${compId}&team=${teamId}&season=${season}`, {"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "1a3508246c26e132ec89913136f83975"
	}   
    }).then(response => {
        if(!response.ok){
            return store.getItem(`team_${compId}_${teamId}_${season}`) ? store.getItem(`team_${compId}_${teamId}_${season}`) : new Error('Error retrieving data')
        }

        return response.json()
    }).then(response => {
        store.setItem(`team_${compId}_${teamId}_${season}`, JSON.stringify(response));
        return response
    })

    const availableSeasons = await fetch(`https://v3.football.api-sports.io/teams/seasons?team=${teamId}`, {"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "1a3508246c26e132ec89913136f83975"
	}   
    }).then(response => {
        if(!response.ok){
            return store.getItem(`teamSeasons_${teamId}`) ? store[`teamSeasons_${teamId}`] : new Error('Error retrieving data')
        }
        return response.json();
    }).then(response => {
        store.setItem(`teamSeasons_${teamId}`, JSON.stringify(response));
    
        return response
    });
    

return {teamData, availableSeasons};
}
}

export const transfersLoader = async ({params}: any) => {
    const {teamId} = params; 

    if(!navigator.onLine || store.getItem('offline') !== null){
        if(store.getItem(`transfers_${teamId}`)){
            const transfers = JSON.parse(store[`transfers_${teamId}`]);

            return {transfers};
        }
        throw new Error('Looks like you are offline and we couldn\'t save this data')
    } else {

        
    const transfers = await fetch(`https://v3.football.api-sports.io/transfers/?team=${teamId}`, {"method": "GET",
	"headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "1a3508246c26e132ec89913136f83975"
	}   
}).then(response => {
    if(!response.ok){
        return store.getItem(`transfers_${teamId}`) ? store[`transfers_${teamId}`] : new Error('Error retrieving data')
    }
    return response.json();
}).then(response => {
    store.setItem(`transfers_${teamId}`, JSON.stringify(response));

    return response
});

return {transfers}
}
}

export const squadLoader = async ({params}: any) =>{

    const {teamId} = params;

    if(!navigator.onLine){
        if(store.getItem(`squad_${teamId}`)){
            return store[`squad_${teamId}`]
        } throw new Error('Looks like you are offline and we couldn\'t save this data')
    } else {   
        const squad = await fetch(
        `https://v3.football.api-sports.io/players/squads?team=${teamId}`, {"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "1a3508246c26e132ec89913136f83975"
	}   
    }
    ).then(response => response.json()).then(response => {
        store.setItem(`squad_${teamId}`, JSON.stringify(response));
        return response
})

    return {squad};
    }
}

export const playerLoader = async ({params}: any) =>{
    const {playerId, season} = params;

    if(!navigator.onLine){
        if(store.getItem(`playerSeasons_${playerId}`) && store.getItem(season === 'season' ? `player_${playerId}` : `player_${playerId}_${season}`)){
            const availableSeasons = JSON.parse(store[`playerSeasons_${playerId}`]);
            const player = JSON.parse(store[season === 'season' ? `player_${playerId}` : `player_${playerId}_${season}`]);

            return {player, availableSeasons};
        } throw new Error('Looks like you are offline and we couldn\'t save this data')
    } else {

        
        const availableSeasons = await fetch(
        `https://v3.football.api-sports.io/players/seasons?player=${playerId}`, {"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "1a3508246c26e132ec89913136f83975"
	}   
    }
    ).then(response => {
        if(!response.ok){
            return store[`playerSeasons_${playerId}`] !== null ? store[`playerSeasons_${playerId}`] : new Error('error retrieving data');
        } return response.json()
    }).then(response => {
        store.setItem(`playerSeasons_${playerId}`, JSON.stringify(response));
        return response
    })
 

    const player = await fetch(
        season === 'season' ?  
        `https://v3.football.api-sports.io/players?id=${playerId}&season=${availableSeasons.response.slice(-1)}`
        : `https://v3.football.api-sports.io/players?id=${playerId}&season=${season}`
        , {"method": "GET"
        ,
	"headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "1a3508246c26e132ec89913136f83975"
	}   
}
).then(response => 
     response.json()).then(response => {
    store.setItem(season === 'season' ? `player_${playerId}` : `player_${playerId}_${season}`, JSON.stringify(response));
    return response
})

return {player, availableSeasons};
}

}

export const liveFixturesLoader = async () =>{

    const liveFixtures = await fetch(`https://v3.football.api-sports.io/fixtures?live=all`, {"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "1a3508246c26e132ec89913136f83975"
	}   
    }
    ).then(response => response.json())

    return {liveFixtures};
}

export const fixtureLoader = async ({params}: any) =>{
    const {fixtureId} = params;

    const fixtureStats = await fetch(`https://v3.football.api-sports.io/fixtures/statistics?fixture=${fixtureId}`, {"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "1a3508246c26e132ec89913136f83975"
	}   
    }
    ).then(response => response.json())

    const fixture = await fetch(`https://v3.football.api-sports.io/fixtures?id=${fixtureId}`, {"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "1a3508246c26e132ec89913136f83975"
	}   
    }
    ).then(response => response.json())

    return {fixtureStats, fixture};
}