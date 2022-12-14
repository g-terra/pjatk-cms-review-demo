import { createTheme } from "@mui/material";

const dark = createTheme({
    name:'dark',
    palette: {
        mode: 'dark',
        contrast: {
            main: '#ffffff'
        }
    }
});

const light = createTheme({
    name:'light',
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