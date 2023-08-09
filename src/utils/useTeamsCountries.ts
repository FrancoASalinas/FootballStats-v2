import { useEffect, useState } from 'react';
import useOfflineMode from './useOfflineMode';

interface Country {
  name: string;
}

export default function useTeamsCountries() {
  const [countries, setTeamsCountries] = useState<any[]>([]);
  const [offline] = useOfflineMode();

  useEffect(() => {

    if(!navigator.onLine || offline){
      if(window.localStorage.getItem('countries') !== null){
        setTeamsCountries(JSON.parse(window.localStorage.countries).filter(
          (country: any) =>
            localStorage.getItem(`${country.name}_comps`) !== null
        )
        .sort((a: Country, b: Country) => {
          if (a.name > b.name) {
            return +1;
          } else if (a.name < b.name) {
            return -1;
          } else return 0;
        }))
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
        offline
          ? setTeamsCountries(result.response
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
              }))
          : setTeamsCountries(result.response.sort((a: Country, b: Country) => {
              if (a.name > b.name) {
                return +1;
              } else if (a.name < b.name) {
                return -1;
              } else return 0;
            }));
        window.localStorage.countries = JSON.stringify(result.response)
      } )
      .catch((error) => console.log('error', error));

    }

    

  }, [offline]);

  return  [countries, offline] as const;
;
}
