import {green, orange, red} from '@mui/material/colors';
import {createTheme} from '@mui/material';
import {zhCN} from '@mui/material/locale';

export const mainColor = '#0276aa';
export const secondaryColor = '#19857b';
export const highAlertColor = red['900'];
export const alertColor = orange['900'];
export const greenColor = green['700'];
export const highAlertBackgroundColor = '#ffbf00';
export const reactIconSize = '0.7em';
export const theme = createTheme(
  {
    palette: {
      primary: {
        main: mainColor,
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: red.A400,
      },
      background: {
        default: '#fff',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          a: {
            textDecoration: 'none',
            color: 'inherit',
            '&:visited': {
              color: 'inherit',
            },
            '&:active': {
              color: 'inherit',
            },
            '&:hover': {
              color: 'inherit',
            },
          },
          '::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '::-webkit-scrollbar-thumb': {
            background: '#888',
          },
          '::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        },
      },
    },
  },
  zhCN
);
