import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import { useEffectOnce } from '../hooks/useEffectOnce';
import layoutService from '../services/layout.service';

const LayoutContext = createContext();

export function LayoutContextProvider({ children }) {

    const [layout, setLayout] = useState({})

    const router = useRouter()

    useEffect(() => {
        layoutService.get(router.locale)
            .then((result) => setLayout(result))
            .catch((error) => console.log("An error occurred:" + error));
    },[])

    return (
        <LayoutContext.Provider value={layout}>
            {children}
        </LayoutContext.Provider>
    );
}

export function useLayoutContext(){
    
    const context = useContext(LayoutContext);

    if (context === undefined) {
      throw new Error("useLayoutContext was used outside of its Provider");
    }
  
    return context;
  };
