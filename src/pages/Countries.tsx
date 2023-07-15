import { Link } from 'react-router-dom';
import useTeamsCountries from '../utils/useTeamsCountries.ts';

function Countries() {
  const countries = useTeamsCountries();

  let letter = '';

  const sortedData = countries.slice(0).sort((a: any, b: any) => {
    if (a.name > b.name) {
      return +1;
    } else if (a.name < b.name) {
      return -1;
    } else return 0;
  });

  return (
    <>
      <article>
        <h2 className="text-3xl">Countries</h2>
        <div className="sm:grid grid-cols-2 ">
          {sortedData.length !== 0 &&
            sortedData.map((country: { name: string }) => {
              if (country.name[0] === letter || !country.name[0].match(/[A-Z]/))
                return null;
              else {
                letter = country.name[0];
                return (
                  <div className="py-5 text-xl">
                    <h3 key={letter} className="text-2xl">
                      {letter}
                    </h3>
                    <ul key={letter + letter}>
                      {sortedData
                        .filter((c: { name: string }) => c.name[0] === letter)
                        .map((item: { name: string }) => (
                          <li key={item.name}>
                            <Link to={`${item.name}`}>{item.name}</Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                );
              }
            })}
        </div>
      </article>
    </>
  );
}

export default Countries;
