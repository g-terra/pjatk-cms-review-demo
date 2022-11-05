import { Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppLocaleContext } from "../../context/appLocale.context";
import componentLocales from "../componentLocales";

export default function UserAuth() {

    const session = useSession()
    const router= useRouter()


    const [locale, setLocale] = useState({})
    
    const context = useAppLocaleContext()

    useEffect(()=>{
        setLocale(context.locale)
    })

    if (session?.status === 'authenticated') return (
        <Button variant="outlined" size="small" onClick={signOut}>{locale[componentLocales.button.singOut]}</Button>
    );
    return (<Button variant="outlined" size="small" onClick={() => { router.push(`/user/login`)}}> {locale[componentLocales.button.signIn]}</Button>)

}
