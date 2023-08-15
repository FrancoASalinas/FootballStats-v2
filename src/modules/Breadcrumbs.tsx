import { Link, useLocation } from 'react-router-dom';

function Breadcrumbs() {
  const location = useLocation();

  const locationPaths = location.pathname
    .split('/')
    .filter((item) => item !== '');

  function toTitleCase(str: string): string {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }

  return (
    <div className=" flex gap-3">
      {locationPaths.map((path, index) => (
        <Link to={locationPaths.slice(0, index + 1).join('/')}>
          {toTitleCase(path)} {index + 1 !== locationPaths.length ? '/' : ''}
        </Link>
      ))}
    </div>
  );
}

export default Breadcrumbs;
