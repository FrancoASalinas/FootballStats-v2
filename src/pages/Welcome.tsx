import {Link} from 'react-router-dom';

function Welcome() {
    return ( 
        <header className="w-full h-screen items-center justify-center bg-primary grid grid-rows-[85%_15%]">
            <div className='p-5'>
            <h1 className="text-7xl ">Football Stats</h1>
            <p className='m-2'>The place where you get everything from your favorite sport</p>
            </div>
            <div className="flex gap-5 justify-center">
            <button className="border-black border rounded-lg p-2">Install <i className="fa-solid fa-download"></i></button>
            
            <button className="border-black border rounded-lg p-2"> <Link to='/'>Get Started</Link> </button>
            
            </div>
        </header>
     );
}

export default Welcome;