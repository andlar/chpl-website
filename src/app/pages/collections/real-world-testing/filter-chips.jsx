import React, { useEffect, useState } from 'react';
import {
  Chip, Typography,makeStyles,
} from '@material-ui/core';
import { useFilterContext } from './filter-context';
const useStyles = makeStyles(() => ({
  filterSelectedContainer: {
   display:'flex',
   gap:'4px',
   alignItems:'center',
   justifyContent:'flex-start',
   flexWrap:'wrap',
  },
}));
function ChplFilterChips() {
  const [filters, setFilters] = useState([]);
  const filterContext = useFilterContext();
  const classes = useStyles();
  useEffect(() => {
    setFilters(filterContext.filters
               .sort((a, b) => a.key < b.key ? -1 : 1)
               .map((f) => ({
                 ...f,
                 values: f.values
                   .filter((f) => f.selected)
                   .sort((a, b) => a.value < b.value ? -1 : 1),
               }))
               .filter((f) => f.values.length > 0)
              );
  }, [filterContext.filters]);

  return (
    <>
      { filters.map((f) => (
        <span className={classes.filterSelectedContainer} key={f.key}>
          <Typography variant='subtitle2'>{f.display}:</Typography>
          {f.values
            .map((v) => (
              <Chip
                key={v.value}
                label={`${v.value}`}
                onDelete={() => filterContext.dispatch('toggle', f, v)}
                color="primary"
                variant="outlined"
              />
            ))}
        </span>
      ))}
    </>
  );
}

export default ChplFilterChips;

ChplFilterChips.propTypes = {
};
