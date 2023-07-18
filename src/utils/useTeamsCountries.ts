import { useEffect, useState } from 'react';


export default function useTeamsCountries() {
  const [countries, setTeamsCountries]: [countries: [], setTeamsCountries: any] = useState([]);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append('x-rapidapi-key', '1a3508246c26e132ec89913136f83975');
    myHeaders.append('x-rapidapi-host', 'v3.football.api-sports.io');

    fetch('https://v3.football.api-sports.io/countries', {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => setTeamsCountries(result.response))
      .catch((error) => console.log('error', error));
  }, []);

  return countries;
}
