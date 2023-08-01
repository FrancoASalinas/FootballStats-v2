import { useEffect, useState } from "react";

export default function useInstallPrompt(){
    const [deferredPrompt, setDeferredPrompt] = useState<null | any>(null);
    
    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            setDeferredPrompt(e)
        })       
    
    }, [])

    function showInstallPrompt(){
        if (deferredPrompt !== null) deferredPrompt.prompt();
      }

    return showInstallPrompt
}