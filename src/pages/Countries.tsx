import { Link, useLoaderData, useNavigation } from 'react-router-dom';
import Spinner from '../modules/Spinner.tsx';

type Countries = {response: [{ name: string }]};

function Countries() {
  const countries = useLoaderData() as Countries;
  const navigation = useNavigation();

  let letter = '';
  return (
    <>
      <article>
        <h2 className="text-3xl">Countries</h2>
        <div className="sm:grid grid-cols-2 ">
          {navigation.state === 'loading' ? (
            <Spinner />
          ) : (
            countries.response.map((country) => {
              if (country.name[0] === letter || !country.name[0].match(/[A-Z]/))
                return null;
              else {
                letter = country.name[0];
                return (
                  <div key={letter} className="py-5 text-xl">
                    <h3 className="text-2xl">{letter}</h3>
                    <ul>
                      {countries.response
                        .filter((c) => {
                          return c.name[0] === letter;
                        })
                        .map((item) => (
                          <li key={item.name}>
                            <Link to={`${item.name}`}>{item.name}</Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                );
              }
            })
          )}
        </div>
      </article>
    </>
  );
}

export default Countries;
