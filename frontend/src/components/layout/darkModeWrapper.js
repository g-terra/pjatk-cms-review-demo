import { ThemeProvider } from "@emotion/react"
import { CssBaseline, Grid } from "@mui/material"
import { useState } from "react"
import DarkModeSwitch from "../utils/darkModeSwitch"
import Themes from "../utils/themes"

export default function DarkModeWrapper({ children }) {
    const [theme, setTheme] = useState(Themes.light)

    const [darkMode, setDarkMode] = useState(false)

    const handleChange = () => {
        if (darkMode) {
            setTheme(Themes.light)
            setDarkMode(false)
        } else {
            setTheme(Themes.dark)
            setDarkMode(true)
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Grid container justifyContent="space-between" sx={{ p: '1em' }}>
                <DarkModeSwitch handleChange={handleChange} />
            </Grid>
            {children}
        </ThemeProvider>

    )
}