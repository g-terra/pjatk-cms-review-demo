import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import { useEffectOnce } from '../hooks/useEffectOnce';
import layoutService from '../services/layout.service';

const AppLocaleContext = createContext();

export function AppLocaleContextProvider({ children }) {

    const [locale, setLocales] = useState({})

    const router = useRouter()

    useEffect(() => {
        layoutService.getComponentLocale(router.locale)
            .then((result) => setLocales(result))
            .catch((error) => console.log("An error occurred:" + error));
    },[])

    return (
        <AppLocaleContext.Provider value={locale}>
            {children}
        </AppLocaleContext.Provider>
    );
}

export function useAppLocaleContext(){
    
    const context = useContext(AppLocaleContext);

    if (context === undefined) {
      throw new Error("useLayoutContext was used outside of its Provider");
    }

  
    return context;
  };
