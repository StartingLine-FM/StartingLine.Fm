import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#55c6f0',
        },
        secondary: {
            main: '#fb5745',
        },
        background: {
            paper: '#fff9f2',
            default: '#fff9f2',
        },
        error: {
            main: '#b03c30',
        },
        text: {
            primary: '#1d1e1e',
        },
    },
    typography: {
        fontFamily: 'Montserrat',
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 800,
    },
});

export default theme;