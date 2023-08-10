import { Link } from 'react-router-dom';
import useTeamsCountries from '../utils/useTeamsCountries.ts';

function Countries() {
  const [countries] = useTeamsCountries();

  let letter = '';

  return (
    <>
      <article>
        <h2 className="text-3xl">Countries</h2>
        <div className="sm:grid grid-cols-2 ">
          {countries.length > 0 &&
            countries.map((country: { name: string }) => {
              if (country.name[0] === letter || !country.name[0].match(/[A-Z]/))
                return null;
              else {
                letter = country.name[0];
                return (
                  <div key={letter} className="py-5 text-xl">
                    <h3 className="text-2xl">{letter}</h3>
                    <ul>
                      {countries
                        .filter((c: { name: string }) => {
                          return c.name[0] === letter;
                        })
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
