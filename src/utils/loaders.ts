
const store = window.localStorage

export const countryLoader = async ({params}: any) => {

    const {countryName} = params;

    if(!navigator.onLine){
        if(store.getItem(countryName + '_comps') !== null){
            return JSON.parse(store[countryName + '_comps'])
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
            return store.getItem(availableSeasons) !== null ? store.getItem('availableSeasons_' + compId) : new Error('Error retreiving data')
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


    const teamData = await fetch(`https://v3.football.api-sports.io/teams/statistics?league=${compId}&team=${teamId}&season=${season}`, {"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "1a3508246c26e132ec89913136f83975"
	}   
    }).then(response => response.json());

    const availableSeasons = await fetch(`https://v3.football.api-sports.io/teams/seasons?team=${teamId}`, {"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "1a3508246c26e132ec89913136f83975"
	}   
    }).then(response => response.json())

    const transfers = await fetch(`https://v3.football.api-sports.io/transfers/?team=${teamId}`, {"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "1a3508246c26e132ec89913136f83975"
	}   
    }).then(response => response.json());

    return {teamData, availableSeasons, transfers};
    
}

export const squadLoader = async ({params}: any) =>{

    const {teamId} = params;

    const squad = await fetch(
        `https://v3.football.api-sports.io/players/squads?team=${teamId}`, {"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "1a3508246c26e132ec89913136f83975"
	}   
    }
    ).then(response => response.json())

    return {squad};
}

export const playerLoader = async ({params}: any) =>{
    const {playerId, season} = params;

    const availableSeasons = await fetch(
        `https://v3.football.api-sports.io/players/seasons?player=${playerId}`, {"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "1a3508246c26e132ec89913136f83975"
	}   
    }
    ).then(response => response.json())
 

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
    ).then(response => response.json())

    return {player, availableSeasons};
    
}