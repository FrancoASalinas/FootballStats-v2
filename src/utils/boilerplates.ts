export async function simpleFetchBoilerplate(urls: string[]){

    const fetchData = urls.map(async (url) => {
      const data = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': '1a3508246c26e132ec89913136f83975',
        },
      })
        .then((response) => {
          if (!response.ok) {
              throw new Response('Error retreiving data');
          }

          return response.json();
        })
        .then((response) => {
          if (!Array.isArray(response.errors)) {
              throw new Response(Object.values(response.errors)[0] as string);
          } else {
            return response;
          }
        })
        .catch((err) => {
          throw new Response(err);
        });

      return data;
    });

    const res = await Promise.all(fetchData);

    return res;
}

export async function fetchBoilerplate(
    storageReferences: string[],
    fetchObject: { url: string; reference: string }[]
  ) {
    const referencesExist = storageReferences?.every(
      (reference) => localStorage.getItem(reference) !== null
    );
    const parsedReferences = storageReferences?.map((reference) =>
      JSON.parse(localStorage.getItem(reference) as string)
    );
  
    if (!navigator.onLine || localStorage.getItem('offline') !== null) {
      if (referencesExist) {
        return parsedReferences;
      } else {
        throw new Response(
          "Looks like you are offline and we couldn't save this data"
        );
      }
    } else {
      const fetchData = fetchObject.map(async (item) => {
        const data = await fetch(item.url, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': '1a3508246c26e132ec89913136f83975',
          },
        })
          .then((response) => {
            if (!response.ok) {
              if(localStorage.getItem(item.reference) === null){
                throw new Response('Error retreiving data');
              }
              else if (localStorage.getItem(item.reference) !== null) {
                return localStorage.getItem(item.reference);
              }
            }
  
            return response.json();
          })
          .then((response) => {
            if (!Array.isArray(response.errors)) {
              if (localStorage.getItem(item.reference) !== null) {
                return localStorage.getItem(item.reference);
              } else {
                throw new Response(Object.values(response.errors)[0] as string);
              }
            } else {
              localStorage.setItem(item.reference, JSON.stringify(response));
              return response;
            }
          })
          .catch((err) => {
            throw new Response(err);
          });
  
        return data;
      });
  
      const res = await Promise.all(fetchData);
  
      return res;
    }
  }