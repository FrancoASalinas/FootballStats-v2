import { Link, useMatches } from 'react-router-dom';

type Match = {
  id: string;
  pathname: string;
  params: unknown;
  data: {
    availableCompSeasons: {
      response: [
        {
          league: {
            name: string;
          };
        }
      ];
    };
  };
  handle: unknown;
}[];

function Breadcrumbs() {
  const matches = useMatches();
  const crumbs = matches
    .filter((match: any) => Boolean(match.handle?.crumb))
    .map((match: any) => match.handle.crumb(match.data));

  return (
    <ol className="flex gap-3">
      {crumbs.map((crumb, index) => (
        <li key={index}>{crumb}</li>
      ))}
    </ol>
  );
}

export const CustomBreadCrumbs = () => {
  const matches = useMatches() as Match;
  const match = matches.filter((match) => match.id === 'comp')[0];

  return (
    <Link to={`${match.pathname}`}>
      {match.data?.availableCompSeasons.response[0].league.name}
    </Link>
  );
};

export default Breadcrumbs;
