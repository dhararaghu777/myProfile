import { createTheme } from "@mui/material/styles";

const prusianBlue= '#1D3557';
const celadonBlue= "#457b9d";
const powderBlue="#A8DADC";
const honeyDew= "#F1FAEE";
const imperialRed= "#E63946";


export default createTheme({
    palette: {
        primary: {
            main: prusianBlue,
        },
        secondary: {
            main: celadonBlue,

        },
        third: {
            main: powderBlue
        },
        fourth: {
            main: honeyDew
        },
        fifth: {
            main: imperialRed
        }
    }
});