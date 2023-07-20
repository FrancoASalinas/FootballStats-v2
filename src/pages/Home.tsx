import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-[65%_35%]">
        <article className="my-5 w-full">
          <h2 className="text-3xl">Your favorite Topics</h2>
          <Link className="py-2 my-2 underline" to="countries">
            Browse Teams
          </Link>
        </article>
        <aside className="my-5 border-t p-2 sm:border-t-0 sm:border-l h-full border-dark min-h-[50%]">
          <h3 className="text-2xl">Recently visited Topics</h3>
        </aside>
      </div>
    </>
  );
}

export default Home;
