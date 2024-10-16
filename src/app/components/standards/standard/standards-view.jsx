import React, { useEffect, useState } from 'react';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  makeStyles,
} from '@material-ui/core';
import { arrayOf, func } from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import { useFetchStandardsActivity } from 'api/activity';
import ChplSystemMaintenanceActivity from 'components/activity/system-maintenance-activity';
import { ChplUpdateIndicator } from 'components/util';
import { ChplSortableHeaders, sortComparator } from 'components/util/sortable-headers';
import { sortCriteria } from 'services/criteria.service';
import { getDisplayDateFormat } from 'services/date-util';
import { standard as standardPropType } from 'shared/prop-types';

const headers = [
  { property: 'value', text: 'Value', sortable: true },
  { property: 'regulatoryTextCitation', text: 'Regulatory Text Citation', sortable: true },
  { property: 'startDay', text: 'Start Date', sortable: true },
  { property: 'requiredDay', text: 'Required Date', sortable: true },
  { property: 'endDay', text: 'End Date', sortable: true },
  { text: 'Rule' },
  { text: 'Applicable Criteria' },
  { text: 'Group' },
  { text: 'Action', invisible: true },
];

const useStyles = makeStyles({
  firstColumn: {
    position: 'sticky',
    left: 0,
    boxShadow: 'rgba(149, 157, 165, 0.1) 0px 4px 8px',
    backgroundColor: '#fff',
  },
  tableResultsHeaderContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

function ChplStandardsView({ dispatch, standards: initialStandards }) {
  const [standards, setStandards] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('value');
  const classes = useStyles();

  useEffect(() => {
    setStandards(initialStandards
      .map((item) => ({
        ...item,
        criteriaDisplay: item.criteria
          .sort(sortCriteria)
          .map((c) => `${c.status === 'REMOVED' ? 'Removed | ' : ''}${c.number}`)
          .join(', '),
      }))
      .sort(sortComparator('value')));
  }, [initialStandards]);

  const handleTableSort = (event, property, orderDirection) => {
    const descending = orderDirection === 'desc';
    const updated = standards.sort(sortComparator(property, descending));
    setOrderBy(property);
    setOrder(orderDirection);
    setStandards(updated);
  };

  return (
    <>
      <div className={classes.tableResultsHeaderContainer}>
        <ChplSystemMaintenanceActivity
          fetch={useFetchStandardsActivity}
          title="Standards"
        />
        <Button
          onClick={() => dispatch({ action: 'edit', payload: {} })}
          id="add-new-standard"
          variant="contained"
          color="primary"
          endIcon={<AddIcon />}
        >
          Add
        </Button>
      </div>
      <TableContainer className={classes.container} component={Paper}>
        <Table
          aria-label="Standards table"
        >
          <ChplSortableHeaders
            headers={headers}
            onTableSort={handleTableSort}
            orderBy={orderBy}
            order={order}
            stickyHeader
          />
          <TableBody>
            { standards
              .map((item) => (
                <TableRow key={`${item.id}-${item.value}`}>
                  <TableCell className={classes.firstColumn}>
                    { item.value }
                    { item.retired && ' (Expired)'}
                    <ChplUpdateIndicator
                      requiredDay={item.requiredDay}
                      endDay={item.endDay}
                      additionalInformation={item.additionalInformation}
                    />
                  </TableCell>
                  <TableCell>
                    { item.regulatoryTextCitation }
                  </TableCell>
                  <TableCell>
                    { getDisplayDateFormat(item.startDay) }
                  </TableCell>
                  <TableCell>
                    { getDisplayDateFormat(item.requiredDay) }
                  </TableCell>
                  <TableCell>
                    { getDisplayDateFormat(item.endDay) }
                  </TableCell>
                  <TableCell>
                    { item.rule?.name ?? '' }
                  </TableCell>
                  <TableCell>
                    { item.criteriaDisplay }
                  </TableCell>
                  <TableCell>
                    { item.groupName ?? '' }
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => dispatch({ action: 'edit', payload: item })}
                      id={`edit-standard-${item.value}`}
                      variant="contained"
                      color="secondary"
                      endIcon={<EditOutlinedIcon />}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ChplStandardsView;

ChplStandardsView.propTypes = {
  dispatch: func.isRequired,
  standards: arrayOf(standardPropType).isRequired,
};
