import { Button, Container, CssBaseline, Grid, ThemeProvider } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAppLocaleContext } from "../../context/appLocale.context"
import DarkModeSwitch from "../utils/darkModeSwitch"
import LanguageSwitcher from "../utils/languageSwitcher"
import Themes from "../utils/themes"
import UserAuth from "./userAuth"

export default function UserControlBar({ children }) {
    const [theme, setTheme] = useState(Themes.light)

    const [darkMode, setDarkMode] = useState(false)

    const router = useRouter()

    const localeContext = useAppLocaleContext()

    useEffect(() => {
        if (localStorage.getItem('darkMode') === 'true') {
            setTheme(Themes.dark)
            setDarkMode(true)
        } else {
            setTheme(Themes.light)
            setDarkMode(false)
        }
    })

    const handleChange = () => {
        if (darkMode) {
            setTheme(Themes.light)
            setDarkMode(false)
            localStorage.setItem("darkMode", false)
        } else {
            setTheme(Themes.dark)
            setDarkMode(true)
            localStorage.setItem("darkMode", true)
        }
    }





    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Grid container justifyContent="space-between" sx={{ p: '1em' }}>
                <Grid item >
                    <Grid container direction={'row'}>
                    <DarkModeSwitch handleChange={handleChange} active={darkMode} />
                    <LanguageSwitcher />
                    </Grid>
                   
                </Grid>
                <Grid item>
                    {
                        !router.asPath.includes("/user/") && <UserAuth />
                    }
                </Grid>
            </Grid>
            {children}
        </ThemeProvider>

    )
}