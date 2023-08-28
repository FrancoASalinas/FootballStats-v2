import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";

function ErrorPage() {

    const error = useRouteError();
    const navigate = useNavigate();

    return ( 
        <div className="bg-light font-roboto p-16 min-h-screen dark:bg-dark dark:text-light">
        <h2 className="text-3xl font-semibold">Error {isRouteErrorResponse(error) ? (error.statusText) : ('')}</h2>
        <p className="text-xl py-5">
        {error ? error?.toString() : 'unknown error'}
        </p>
        <button className='p-3 border-dark border dark:border-light rounded-3xl hover:scale-105 transition-all' onClick={() => navigate('/FootballStats-v2/')}>To Home</button>
        </div>
     );
}

export default ErrorPage;