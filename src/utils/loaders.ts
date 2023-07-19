export const countryLoader = async ({params}: any) => {
    const {countryName} = params;

    const data = await fetch(`https://v3.football.api-sports.io/leagues?country=${countryName}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": '1a3508246c26e132ec89913136f83975'
	}
})


return data.json()
}

export const compLoader = async ({params}: any) => {
    const {compId, compSeason} = params;

    let currentSeasonStandings: any;

    const  availableSeasons = await fetch(`https://v3.football.api-sports.io/leagues?id=${compId}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": '1a3508246c26e132ec89913136f83975'
        }
    }).then(response => response.json())
    
    if(compSeason){
          currentSeasonStandings = await fetch(`https://v3.football.api-sports.io/standings?league=${compId}&season=${compSeason}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": '1a3508246c26e132ec89913136f83975'
            }
        }).then(response => response.json())
    } else{
        currentSeasonStandings = await fetch(`https://v3.football.api-sports.io/standings?league=${compId}&season=${availableSeasons.response[0].seasons.filter((season: {current: boolean}) => season.current === true)[0].year}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": '1a3508246c26e132ec89913136f83975'
            }
        }).then(response => response.json())
    }
    
        return {availableSeasons, currentSeasonStandings} 
}
