import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { arrayOf, bool, string } from 'prop-types';

import ChplComplaint from './complaint';
import ChplComplaintAdd from './complaint-add';
import ChplComplaintsDownload from './complaints-download';

import { useFetchComplaints } from 'api/complaints';
import {
  ChplFilterChips,
  ChplFilterPanel,
  ChplFilterSearchTerm,
  useFilterContext,
} from 'components/filter';
import { ChplEllipsis, ChplPagination } from 'components/util';
import { ChplSortableHeaders } from 'components/util/sortable-headers';
import { getDisplayDateFormat } from 'services/date-util';
import { useSessionStorage as useStorage } from 'services/storage.service';
import { BreadcrumbContext, UserContext } from 'shared/contexts';
import { palette, theme, utilStyles } from 'themes';

const useStyles = makeStyles({
  ...utilStyles,
  container: {
    maxHeight: '64vh',
  },
  searchContainer: {
    backgroundColor: palette.grey,
    padding: '16px 32px',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '16px',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
    },
  },
  tableResultsHeaderContainer: {
    display: 'grid',
    gap: '8px',
    margin: '16px 32px',
    gridTemplateColumns: '1fr',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'auto auto',
    },
  },
  resultsContainer: {
    display: 'grid',
    gap: '8px',
    justifyContent: 'start',
    gridTemplateColumns: 'auto auto',
    alignItems: 'center',
  },
  wrap: {
    flexFlow: 'wrap',
  },
  noResultsContainer: {
    padding: '16px 32px',
  },
  statusIndicatorOpen: {
    color: '#66926d',
  },
  statusIndicatorClosed: {
    color: 'rgba(0, 0, 0, 0.87)',
  },
});

function ChplComplaintsView(props) {
  const storageKey = 'storageKey-complaintsView';
  const { canAdd, bonusQuery, disallowedFilters } = props;
  const { append, display, hide } = useContext(BreadcrumbContext);
  const { hasAnyRole } = useContext(UserContext);
  const [activeComplaint, setActiveComplaint] = useState(undefined);
  const [complaints, setComplaints] = useState([]);
  const [order, setOrder] = useStorage(`${storageKey}-order`, 'desc');
  const [orderBy, setOrderBy] = useStorage(`${storageKey}-orderBy`, 'received_date');
  const [pageNumber, setPageNumber] = useStorage(`${storageKey}-pageNumber`, 0);
  const [pageSize, setPageSize] = useStorage(`${storageKey}-pageSize`, 10);
  const { queryParams, queryString } = useFilterContext();
  const {
    data, error, isError, isLoading, isSuccess,
  } = useFetchComplaints({
    orderBy,
    pageNumber,
    pageSize,
    sortDescending: order === 'desc',
    query: `${queryString()}${bonusQuery}`,
  });
  const classes = useStyles();
  let handleDispatch;

  useEffect(() => {
    append(
      <Button
        key="viewall.disabled"
        variant="text"
        disabled
      >
        Complaints
      </Button>,
    );
    append(
      <Button
        key="viewall"
        variant="text"
        onClick={() => handleDispatch('close')}
      >
        Complaints
      </Button>,
    );
    display('viewall.disabled');
  }, []);

  useEffect(() => {
    if (data?.recordCount > 0 && pageNumber > 0 && data?.results?.length === 0) {
      setPageNumber(0);
    }
  }, [data?.recordCount, pageNumber, data?.results?.length]);

  useEffect(() => {
    if (isLoading || !isSuccess || !data) { return; }
    const cs = data.results.map((item) => ({
      ...item,
    }));
    setComplaints(cs);
    if (activeComplaint?.id) {
      setActiveComplaint((inUseC) => cs.find((c) => c.id === inUseC.id));
    }
  }, [data, isLoading, isSuccess]);

  /* eslint object-curly-newline: ["error", { "minProperties": 5, "consistent": true }] */
  const headers = hasAnyRole(['ROLE_ACB']) ? [
    { property: 'complaint_status_type_name', text: 'Status', sortable: true },
    { property: 'received_date', text: 'Received Date', sortable: true, reverseDefault: true },
    { property: 'acb_complaint_id', text: 'ONC-ACB Complaint ID', sortable: true },
    { property: 'onc_complaint_id', text: 'ONC Complaint ID', sortable: true },
    { property: 'complainant_type_name', text: 'Complainant Type', sortable: true },
    { property: 'actions', text: 'Actions', invisible: true },
  ] : [
    { property: 'acb_name', text: 'ONC-ACB', sortable: true },
    { property: 'complaint_status_type_name', text: 'Status', sortable: true },
    { property: 'received_date', text: 'Received Date', sortable: true, reverseDefault: true },
    { property: 'acb_complaint_id', text: 'ONC-ACB Complaint ID', sortable: true },
    { property: 'onc_complaint_id', text: 'ONC Complaint ID', sortable: true },
    { property: 'complainant_type_name', text: 'Complainant Type', sortable: true },
    { property: 'actions', text: 'Actions', invisible: true },
  ];

  handleDispatch = (action) => {
    switch (action) {
      case 'close':
        setActiveComplaint(undefined);
        display('viewall.disabled');
        hide('viewall');
        hide('edit.disabled');
        hide('view');
        hide('view.disabled');
        break;
      // no default
    }
  };

  const handleTableSort = (event, property, orderDirection) => {
    setOrderBy(property);
    setOrder(orderDirection);
  };

  const showBreadcrumbs = () => !bonusQuery;

  const viewComplaint = (c) => {
    setActiveComplaint(c);
    display('viewall');
    hide('viewall.disabled');
  };

  if (activeComplaint) {
    return (
      <ChplComplaint
        complaint={activeComplaint}
        dispatch={handleDispatch}
        showBreadcrumbs={showBreadcrumbs()}
      />
    );
  }

  const pageStart = (pageNumber * pageSize) + 1;
  const pageEnd = Math.min((pageNumber + 1) * pageSize, data?.recordCount);

  return (
    <Card>
      { bonusQuery
        && (
          <CardHeader title="Change Requests" />
        )}
      <CardContent>
        <div className={classes.searchContainer} component={Paper}>
          { !disallowedFilters.includes('searchTerm')
            && (
              <ChplFilterSearchTerm
                placeholder="Search by ONC-ACB Complaint ID, ONC Complaint ID, Associated Certified Product, or Associated Criteria"
              />
            )}
          <ChplFilterPanel />
        </div>
        <div>
          <ChplFilterChips />
        </div>
        { isLoading
          && (
            <div className={classes.noResultsContainer}>
              <CircularProgress />
            </div>
          )}
        { !isLoading
          && (
            <>
              { isError
                && (
                  <>
                    <div className={classes.noResultsContainer}>
                      No results were found, due to invalid parameters:
                    </div>
                    <ul>
                      {error.response.data.errorMessages?.map((msg) => (
                        <li key={msg}>{msg}</li>
                      ))}
                      { error.response.data.error}
                    </ul>
                  </>
                )}
              { isSuccess
                && (
                  <>
                    <div className={classes.tableResultsHeaderContainer}>
                      <div className={`${classes.resultsContainer} ${classes.wrap}`}>
                        <Typography variant="subtitle2">Search Results:</Typography>
                        { complaints.length === 0
                          && (
                            <>
                              No results found
                            </>
                          )}
                        { complaints.length > 0
                          && (
                            <Typography variant="body2">
                              {`(${pageStart}-${pageEnd} of ${data?.recordCount} Results)`}
                            </Typography>
                          )}
                      </div>
                      <ButtonGroup size="small" className={classes.wrap}>
                        { canAdd
                          && (
                            <ChplComplaintAdd
                              dispatch={handleDispatch}
                            />
                          )}
                        { hasAnyRole(['ROLE_ADMIN', 'ROLE_ONC', 'ROLE_ONC_STAFF'])
                          && (
                            <ChplComplaintsDownload
                              bonusQuery={bonusQuery}
                              queryParams={queryParams()}
                              recordCount={data.recordCount}
                            />
                          )}
                      </ButtonGroup>
                    </div>
                    { complaints.length > 0
                      && (
                        <>
                          <TableContainer className={classes.container} component={Paper}>
                            <Table
                              stickyHeader
                              aria-label="Complaints table"
                            >
                              <ChplSortableHeaders
                                headers={headers}
                                onTableSort={handleTableSort}
                                orderBy={orderBy}
                                order={order}
                                stickyHeader
                              />
                              <TableBody>
                                {complaints
                                  .map((complaint) => (
                                    <TableRow key={complaint.id}>
                                      { !hasAnyRole(['ROLE_ACB'])
                                       && (
                                         <TableCell>{complaint.acbName}</TableCell>
                                       )}
                                      <TableCell>
                                        <Typography
                                          variant="subtitle1"
                                          className={complaint.complaintStatusTypeName === 'Open' ? classes.statusIndicatorOpen : classes.statusIndicatorClosed}
                                        >
                                          {complaint.complaintStatusTypeName}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>{getDisplayDateFormat(complaint.receivedDate)}</TableCell>
                                      <TableCell>{complaint.acbComplaintId}</TableCell>
                                      <TableCell>
                                        { complaint.oncComplaintId && <ChplEllipsis text={complaint.oncComplaintId} maxLength={50} /> }
                                      </TableCell>
                                      <TableCell>{complaint.complainantTypeName}</TableCell>
                                      <TableCell align="right">
                                        <Button
                                          onClick={() => viewComplaint(complaint)}
                                          variant="contained"
                                          color="primary"
                                        >
                                          View
                                          {' '}
                                          <VisibilityIcon className={classes.iconSpacing} />
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                          <ChplPagination
                            count={data.recordCount}
                            page={pageNumber}
                            rowsPerPage={pageSize}
                            rowsPerPageOptions={[10, 50, 100, 250]}
                            setPage={setPageNumber}
                            setRowsPerPage={setPageSize}
                          />
                        </>
                      )}
                  </>
                )}
            </>
          )}
      </CardContent>
    </Card>
  );
}

export default ChplComplaintsView;

ChplComplaintsView.propTypes = {
  canAdd: bool,
  bonusQuery: string.isRequired,
  disallowedFilters: arrayOf(string).isRequired,
};

ChplComplaintsView.defaultProps = {
  canAdd: true,
};
