import { useEffect, useState } from 'react';


export default function useTeamsCountries() {
  const [countries, setTeamsCountries]: any = useState([]);

  useEffect(() => {
    if(!navigator.onLine){
      if(window.localStorage.getItem('countries') !== null){
        setTeamsCountries(JSON.parse(window.localStorage.countries))
      }
      else{
        throw new Error('Looks like you are offline and we couldn\'t save this data' )
      }
    } else{ 
    var myHeaders = new Headers();
    myHeaders.append('x-rapidapi-key', '1a3508246c26e132ec89913136f83975');
    myHeaders.append('x-rapidapi-host', 'v3.football.api-sports.io');

    fetch('https://v3.football.api-sports.io/countries', {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    })
      .then((response) =>{
        if(!response.ok){
          return window.localStorage.getItem('countries') !== null ? window.localStorage.countries.json() : new Error('Error retreiving data')
        } else{
          return response.json()
        }
      } )
      .then((result) => {
        setTeamsCountries(result.response);
        window.localStorage.countries = JSON.stringify(result.response)
      } )
      .catch((error) => console.log('error', error));
    }
  }, []);

  return countries;
}
