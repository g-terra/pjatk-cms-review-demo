import { ThemeProvider } from "@emotion/react"
import { CssBaseline, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import DarkModeSwitch from "../utils/darkModeSwitch"
import Themes from "../utils/themes"

export default function DarkModeWrapper({ children }) {
    const [theme, setTheme] = useState(Themes.light)

    const [darkMode, setDarkMode] = useState(false)


    useEffect(() => {
        if (localStorage.getItem('darkMode') === 'true') {
            setTheme(Themes.dark)
            setDarkMode(true)
        } else{
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
                <DarkModeSwitch handleChange={handleChange} active={darkMode}/>
            </Grid>
            {children}
        </ThemeProvider>

    )
}