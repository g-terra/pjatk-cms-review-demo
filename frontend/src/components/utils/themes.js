import { createTheme } from "@mui/material";

const dark = createTheme({
    palette: {
        mode: 'dark',
        contrast: {
            main: '#ffffff'
        }
    }
});

const light = createTheme({
    palette: {
        mode: 'light',
        contrast: {
            main: '#121212'
        }
    }
});

const Themes ={
    dark, light
}

export default Themes