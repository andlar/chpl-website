import React from 'react';
import {
  ThemeProvider,
  createMuiTheme,
  Typography,
} from '@material-ui/core';

const defaultTheme = createMuiTheme({});

function rwt() {
  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
      <div>
          <Typography variant='h1'>Real World Testing | Collection</Typography>
      </div>
      </ThemeProvider>
    </div>
  );
}

export default rwt;
