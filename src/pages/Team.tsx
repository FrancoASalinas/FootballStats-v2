import { useLoaderData } from 'react-router-dom';

function Team() {
  const data: any = useLoaderData();

  return (
    <>
      <h1>{data.response[0].team.name}</h1>
      <ul>
        <li>sdasdasdasd</li>
      </ul>
    </>
  );
}

export default Team;
