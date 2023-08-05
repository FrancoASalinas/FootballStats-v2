import {useEffect, useState} from 'react';

export default function useDarkTheme(){
    const [darkTheme, setDarkTheme] = useState(localStorage.theme === 'dark');

    useEffect(() => {
      darkTheme ? localStorage.theme = 'dark' : localStorage.theme = 'light';

      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }, [darkTheme])

   

  return [darkTheme, setDarkTheme] as const;
}