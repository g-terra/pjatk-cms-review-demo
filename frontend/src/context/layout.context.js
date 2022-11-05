import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import { useEffectOnce } from '../hooks/useEffectOnce';
import layoutService from '../services/layout.service';

const LayoutContext = createContext();

export function LayoutContextProvider({ children }) {

    const [layout, setLayout] = useState({})

    const router = useRouter()

    const session = useSession()

    useEffect(() => {
        if (session.status !== 'loading') {
            layoutService.get(router.locale, session?.data?.jwt)
                .then((result) => setLayout(result))
                .catch((error) => console.log("An error occurred:" + error));
        }
    }, [session.status, router.locale])

    return (
        <LayoutContext.Provider value={layout}>
            {children}
        </LayoutContext.Provider>
    );
}

export function useLayoutContext() {

    const context = useContext(LayoutContext);

    if (context === undefined) {
        throw new Error("useLayoutContext was used outside of its Provider");
    }

    return context;
};
