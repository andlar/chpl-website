import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  ThemeProvider,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { number, shape, string } from 'prop-types';

import theme from '../../../themes/theme';

const useStyles = makeStyles(() => ({
  progressBar:{
    borderRadius:'64px',
    padding:'16px',
    marginTop:'16px',
  },
}));

function ChplConfirmProgress(props) {
  const [value, setValue] = useState(0);
  const [label, setLabel] = useState('');

  useEffect(() => {
    setValue(props.value.value);
    setLabel(props.value.label);
  }, [props.value]); // eslint-disable-line react/destructuring-assignment
 
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Card className={classes.progressBar}>
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress
            variant="determinate"
            value={value}
          />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">
            { label}
          </Typography>
        </Box>
      </Box>
      </Card>
    </ThemeProvider>
  );
}

export default ChplConfirmProgress;

ChplConfirmProgress.propTypes = {
  value: shape({
    value: number.isRequired,
    label: string.isRequired,
  }).isRequired,
};
