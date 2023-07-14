import { Link, useLoaderData } from 'react-router-dom';

function CountryTeams() {
  const data: any = useLoaderData();

  let letter = '';

  const sortedData = data.response.toSorted((a: any, b: any) => {
    if (a.team.name > b.team.name) {
      return +1;
    } else if (a.team.name < b.team.name) {
      return -1;
    } else return 0;
  });


  return (
    <>
      <h2></h2>
      <div className="sm:grid grid-cols-2 ">
        {sortedData.length > 0 &&
          sortedData.map((item: any) => {
            if (item.team.name[0] === letter) return;
            letter = item.team.name[0];

            return (
              <div key={letter + 1} className="py-5 text-xl">
                <h3 className="text-2xl">{letter}</h3>
                <ul>
                  {sortedData
                    .filter((it: any) => it.team.name[0] === letter)
                    .map((i: any) => (
                      <li key={i.team.id}>
                        <Link to={`/team/${i.team.id}`}>{i.team.name}</Link>
                      </li>
                    ))}
                </ul>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default CountryTeams;
