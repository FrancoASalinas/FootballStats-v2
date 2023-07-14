import { useLoaderData } from 'react-router-dom';

function Team() {
  const data: any = useLoaderData();

  return (
    <div className="p-5">
      <h1 className="text-3xl ">{data.response[0].team.name}</h1>
      <img className="w-20" src={data.response[0].team.logo}></img>
      <nav>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </nav>
      <article></article>
    </div>
  );
}

export default Team;
