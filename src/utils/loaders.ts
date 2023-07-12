export const countryLoader = async ({params}: any) => {
    const {countryName} = params;

    const data = await fetch(`https://v3.football.api-sports.io/teams?country=${countryName}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": '1a3508246c26e132ec89913136f83975'
	}
})


return data.json()
}