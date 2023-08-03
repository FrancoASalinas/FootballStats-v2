import {useState} from 'react';

function useRecentlyVisited() {
    const localRecents = window.localStorage.recents;
    const [recents, setRecents] = useState(localRecents ? JSON.parse(localRecents) : []);

    window.localStorage.setItem('recents', JSON.stringify(
        recents.map(JSON.stringify).filter((e: any,i: any,a: any) => i === a.indexOf(e)).map(JSON.parse)
    ));





    return [recents, setRecents] as const;
}

export default useRecentlyVisited;