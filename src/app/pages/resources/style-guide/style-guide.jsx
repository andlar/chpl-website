import React from 'react';
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core';

import Elements from './elements';
import theme from '../../../themes/theme';

const defaultTheme = createMuiTheme({});

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    backgroundColor:"#f2f2f2",
    paddingTop: "16px",
    paddingBottom: "128px",
    marginBottom:"-128px",
  },
});

function ChplStyleGuide() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <ThemeProvider theme={defaultTheme}>
        <Elements />
        <ThemeProvider theme={theme}>
          <Elements />
        </ThemeProvider>
      </ThemeProvider>
    </div>
  );
}

export default ChplStyleGuide;
