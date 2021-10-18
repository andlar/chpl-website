import React, { useState } from 'react';
import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Chip,
  Divider,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TablePagination,
  Toolbar,
  ThemeProvider,
  Typography,
  makeStyles,
} from '@material-ui/core';

{/*Component Imports*/ }
import theme from '../../../themes/theme';
import ChplSortableHeaders from '../../../components/util/chpl-sortable-headers';
import SgAdvancedSearch from '../../../pages/resources/style-guide/sg-advanced-search';

{/*Icons*/ }
import BeenhereIcon from '@material-ui/icons/Beenhere';
import GetAppIcon from '@material-ui/icons/GetApp';
import SettingsIcon from '@material-ui/icons/Settings';
import ImportExportOutlinedIcon from '@material-ui/icons/ImportExportOutlined';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import SearchIcon from '@material-ui/icons/Search';
import RestoreIcon from '@material-ui/icons/Restore';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
import GavelOutlinedIcon from '@material-ui/icons/GavelOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';

const useStyles = makeStyles({
  //Page Styling
  container: {
    display: "grid",
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
    backgroundColor: '#f9f9f9',
  },
  content: {
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: '1fr',
    alignItems: 'start',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
  iconSpacing: {
    marginLeft: '4px',
  },
  rowHeader: {
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: '1fr',
    alignItems: 'start',
    padding: '32px',
    backgroundColor: '#ffffff',
  },
  rowBody: {
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: '1fr',
    alignItems: 'start',
    padding: '16px 32px',
    backgroundColor: '#f9f9f9',
  },
  //Table View Styling
  table: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    alignItems: 'start',
    padding: '0 32px ',
    backgroundColor: '#f9f9f9',
  },
  chipsTableSubContainer: {
    alignItems: 'center',
    display: 'flex',
    gap: '8px',
    justifyContent: 'start',
    gridTemplateColumns: 'auto auto',
    padding: '8px 0px',
    flexFlow: 'wrap',
  },
  stickyColumn: {
    position: 'sticky',
    left: 0,
    boxShadow: 'rgba(149, 157, 165, 0.1) 0px 4px 8px',
    backgroundColor: '#ffffff',
  },
  tableContainer: {
    maxHeight: "800px",
    overflowWrap: 'normal',
    border: '.5px solid #c2c6ca',
  },
  tableActionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingBottom: '16px',
    paddingTop: '16px',
    gap: '8px',
  },
  widgetContainer: {
    gap: '8px',
    display: 'grid',
    alignContent: 'space-between',
  },
  //Search Bar Styling
  goButton: {
    margin: '-8px',
    borderRadius: '0px 8px 8px 0px',
  },
  searchIcon: {
    fontSize: '2em',
  },
  searchInput: {
    flexGrow: 1,
  },
  searchBarContainer: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    padding: '8px',
    borderRadius: '8px',
  },
  searchBar: {
    display: 'grid',
    gridTemplateColumns: '11fr auto',
  },
  searchContainer: {
    backgroundColor: '#C6D5E5',
    padding: '16px',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '16px',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'auto 8fr 2fr auto',
    },
  },
  //Card View Styling
  activeStatus: {
    color: '#66926d',
    marginLeft: '4px',
  },
  developerAvatar: {
    color: '#156dac',
    backgroundColor: '#f5f9fd',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '32px',
    padding: '32px',
    backgroundColor: '#f9f9f9',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '3fr 9fr',
    },
  },
  cardContentOne: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '8px',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'auto auto',
    },
  },
  cardContentTwo: {
    display: 'grid',
    gap: '8px',
    gridTemplateColumns: '1fr',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'auto auto auto',
    },
  },
  chipsSubContainer: {
    display: 'grid',
    gap: '8px',
    justifyContent: 'start',
    gridTemplateColumns: 'auto auto',
    padding: '8px 0px',
  },
  productCard: {
    paddingBottom: '8px',
  },
  productCardHeaderContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    padding: '16px',
    gap: '16px',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'auto 11fr',
    },
  },
  productsContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '16px',
    padding: '8px 0px',
  },
  productHeaderContainer: {
    display: 'grid',
    gap: '8px',
    justifyContent: 'start',
    gridTemplateColumns: '1fr',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'auto auto',
    },
  },
  subContent: {
    display: 'grid',
    gap: '8px',
  },
  subProductCardHeaderContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
  },
  resultsContainer: {
    display: 'grid',
    gap: '8px',
    justifyContent: 'start',
    gridTemplateColumns: 'auto auto',
    alignItems: 'center',
  },
  versionProductCardHeaderContainer: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto auto 1fr',
    gap: '8px',
    alignItems: 'center',
  },
  widgetProductContainer: {
    alignContent: 'flex-start',
    display: 'grid',
    gap: '8px',
  },
  wrap: {
    flexFlow: 'wrap',
  },
});

function rwt() {
  const classes = useStyles();
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };
  const [listings, setListings] = useState([
    {
      id: 1,
      chplProductNumber: '15.07.07.1447.IN01.01.00.1.160503',
      developer: 'Epic Systems Corporation',
      product: 'Infection Control Antimicrobial Use and Resistance Reporting',
      edition: '2015',
      rwtPlansUrl: 'Access Here',
      rwtResultsUrl: 'Access Here',
      status: 'OPEN',
      actions: 'Y | N',
    }, {
      id: 2,
      chplProductNumber: '15.07.07.1447.SY01.01.00.1.160505',
      developer: 'Epic Systems Corporation',
      product: 'Syndromic Surveillance Reporting',
      edition: '2015',
      rwtPlansUrl: 'Access Here',
      rwtResultsUrl: 'Access Here',
      status: 'OPEN',
      actions: 'Y | N',
    }, {
      id: 3,
      chplProductNumber: '15.07.07.1447.BE01.01.00.1.160505',
      developer: 'Epic Systems Corporation',
      product: 'Beaker Reportable Labs Reporting',
      edition: '2015',
      rwtPlansUrl: 'Access Here',
      rwtResultsUrl: 'Access Here',
      status: 'OPEN',
      actions: 'Y | N',
    }, {
      id: 4,
      chplProductNumber: '15.04.04.2657.Care.01.00.0.160701',
      developer: 'Carefluence',
      product: 'Carefluence Open API',
      edition: '2015',
      rwtPlansUrl: 'Access Here',
      rwtResultsUrl: 'Access Here',
      status: 'OPEN',
      actions: 'Y | N',
    }, {
      id: 5,
      chplProductNumber: '15.04.04.2980.Modu.09.00.1.160728',
      developer: 'ModuleMD',
      product: 'ModuleMD WISE™',
      edition: '2015',
      rwtPlansUrl: 'Access Here',
      rwtResultsUrl: 'Access Here',
      status: 'CLOSED',
      actions: 'Y | N',
    }, {
      id: 6,
      chplProductNumber: '15.04.04.2891.Alls.17.00.0.160728',
      developer: 'Allscripts',
      product: 'Allscripts TouchWorks EHR',
      edition: '2015',
      rwtPlansUrl: 'Access Here',
      rwtResultsUrl: 'Access Here',
      status: 'CLOSED',
      actions: 'Y | N',
    }, {
      id: 7,
      chplProductNumber: '15.04.04.2891.Alls.AC.00.1.160804',
      developer: 'Allscripts',
      product: 'Allscripts Sunrise Acute Care',
      edition: '2015',
      rwtPlansUrl: 'Access Here',
      rwtResultsUrl: 'Access Here',
      status: 'CLOSED',
      actions: 'Y | N',
    }, {
      id: 8,
      chplProductNumber: '15.04.04.2891.Alls.AM.00.1.160804',
      developer: 'Allscripts',
      product: 'Allscripts Sunrise Ambulatory Care',
      edition: '2015',
      rwtPlansUrl: 'Access Here',
      rwtResultsUrl: 'Access Here',
      status: 'CLOSED',
      actions: 'Y | N',
    }, {
      id: 9,
      chplProductNumber: '15.07.07.1447.EP03.01.00.1.160720',
      developer: 'Epic Systems Corporation',
      product: 'EpicCare Ambulatory EHR Suite',
      edition: '2015',
      rwtPlansUrl: 'Access Here',
      rwtResultsUrl: 'Access Here',
      status: 'CLOSED',
      actions: 'Y | N',
    }, {
      id: 10,
      chplProductNumber: '15.07.07.1447.EP04.01.00.1.160720',
      developer: 'Epic Systems Corporation',
      product: 'EpicCare Inpatient EHR Suite',
      edition: '2015',
      rwtPlansUrl: 'Access Here',
      rwtResultsUrl: 'Access Here',
      status: 'CLOSED',
      actions: 'Y | N',
    }, {
      id: 11,
      chplProductNumber: '15.07.07.1447.BE02.01.00.1.160815',
      developer: 'Epic Systems Corporation',
      product: 'Beacon Cancer Registry Reporting',
      edition: '2015',
      rwtPlansUrl: 'Access Here',
      rwtResultsUrl: 'Access Here',
      status: 'CLOSED',
      actions: 'Y | N',
    }, {
      id: 12,
      chplProductNumber: '15.07.07.2713.CQ01.01.00.1.160916',
      developer: 'Dynamic Health IT, Inc',
      product: 'CQMsolution',
      edition: '2015',
      rwtPlansUrl: 'Access Here',
      rwtResultsUrl: 'Access Here',
      status: 'CLOSED',
      actions: 'Y | N',
    }, {
      id: 13,
      chplProductNumber: '15.07.07.1447.BE01.02.01.1.161014',
      developer: 'Epic Systems Corporation',
      product: 'Beaker Reportable Labs Reporting',
      rwtPlansUrl: 'Access Here',
      rwtResultsUrl: 'Access Here',
      status: 'CLOSED',
      actions: 'Y | N',
    }, {
      id: 14,
      chplProductNumber: '15.07.07.1447.BE01.02.01.1.161014',
      developer: 'Epic Systems Corporation',
      product: 'Beaker Reportable Labs Reporting',
      edition: '2015',
      rwtPlansUrl: 'Access Here',
      rwtResultsUrl: 'Access Here',
      status: 'CLOSED',
      actions: 'Y | N',
    }, {
      id: 15,
      chplProductNumber: '15.07.07.1447.BE01.02.01.1.161014',
      developer: 'Epic Systems Corporation',
      product: 'Beaker Reportable Labs Reporting',
      edition: '2015',
      rwtPlansUrl: 'Access Here',
      rwtResultsUrl: 'Access Here',
      status: 'CLOSED',
      actions: 'Y | N',
    }, {
      id: 16,
      chplProductNumber: '15.07.07.1447.BE01.02.01.1.161014',
      developer: 'Epic Systems Corporation',
      product: 'Beaker Reportable Labs Reporting',
      edition: '2015',
      rwtPlansUrl: 'Access Here',
      rwtResultsUrl: 'Access Here',
      status: 'CLOSED',
      actions: 'Y | N',
    },
  ]);

  const headers = [
    { text: 'CHPL Product Number', property: 'chplProductNumber', sortable: true },
    { text: 'Product', property: 'product', sortable: true },
    { text: 'Edition', property: 'edition', sortable: true },
    { text: 'Developer', property: 'developer', sortable: true },
    { text: 'RWT Plans URL', property: 'rwtPlansUrl', sortable: true },
    { text: 'RWT Results URL', property: 'rwtResultsUrl', sortable: true },
  ];

  const listingSortComparator = (property) => {
    let sortOrder = 1;
    let key = property;
    if (key[0] === '-') {
      sortOrder = -1;
      key = key.substr(1);
    }
    return (a, b) => {
      const result = (a[key] < b[key]) ? -1 : 1;
      return result * sortOrder;
    };
  };

  const handleTableSort = (event, property, orderDirection) => {
    setListings(listings.sort(listingSortComparator(orderDirection + property)).map((listing) => listing));
  };
  return (
    <ThemeProvider theme={theme}>
      {/*Page Container*/}
      <div className={classes.container}>
        <div className={classes.rowHeader}>
          <Typography variant="h1">Collections Page</Typography>
        </div>
        {/*Download All Card*/}
        <div className={classes.rowBody}>
          <Typography variant="h2">Real World Testing</Typography>
          <Divider />
          <div className={classes.content}>
            <div>
              <Typography
                variant="h6"
                gutterBottom
              >
                Ut volutpat mi ligula, sit amet pulvinar felis tincidunt in. Nam libero dui, molestie in volutpat eu, faucibus et urna. Vestibulum vitae leo rhoncus, interdum leo non, euismod erat. Proin vitae ex risus. Integer ac dapibus est, ut ullamcorper mauris. Morbi tincidunt ac ante id vulputate. Sed ut facilisis dui. Nunc ac fermentum libero. Ut sed ligula sit amet eros accumsan placerat.                    Ut volutpat mi ligula, sit amet pulvinar felis tincidunt in. Nam libero dui, molestie in volutpat eu, faucibus et urna. Vestibulum vitae leo rhoncus, interdum leo non, euismod erat. Proin vitae ex risus. Integer ac dapibus est, ut ullamcorper mauris. Morbi tincidunt ac ante id vulputate. Sed ut facilisis dui. Nunc ac fermentum libero. Ut sed ligula sit amet eros accumsan placerat.
              </Typography>
              <Typography>
                For more information <a href="#">visit here</a>
              </Typography>
            </div>
            <Card>
              <CardHeader title="Download All Real Word Testing Data">
              </CardHeader>
              <CardContent>
                <div>
                  <Typography variant="body1">
                    Please note the All RWT file contains information for all certified product listings and is not filtered based on search results.
                  </Typography>
                </div>
              </CardContent>
              <CardActions>
                <Button color="primary" variant="contained">Download ALL <GetAppIcon className={classes.iconSpacing} /></Button>
              </CardActions>
            </Card>
            {/*End of Download All Card*/}
          </div>
          <Divider />
        </div>
        <div className={classes.table}>
          {/*Search Bar*/}
          <Toolbar className={classes.searchContainer}>
            <div><SearchIcon className={classes.searchIcon} color="primary" fontSize="large" /></div>
            <div className={classes.searchBarContainer}>
              <div className={classes.searchBar}>
                <InputBase
                  className={classes.searchInput}
                  placeholder="Search by Developer, Product, or CHPL ID..."
                />
                <Button className={classes.goButton} size="medium" variant="contained" color="primary">Go</Button>
              </div></div>
            <Button variant="outlined" color="primary">Browse All<ExploreOutlinedIcon className={classes.iconSpacing} /></Button>
            <div>
              <ButtonGroup fullWidth variant="text" size="medium">
                <Button color="primary">Restore Search <RestoreIcon className={classes.iconSpacing} /></Button>
                {/*Advanced Search in found in style guide*/}
                <Button color="primary" fullWidth><SgAdvancedSearch /></Button>
              </ButtonGroup>
            </div>
          </Toolbar>
          {/*End of Search Bar*/}

          {/*Table View*/}
          <TableContainer>
            <div className={classes.tableActionContainer} component={Paper}>
              {/*Table Filters*/}
              <div className={classes.chipsTableSubContainer}>
                <Typography variant='subtitle1' gutterBottom>Filters Applied:</Typography>
                <div><Chip icon={<HelpOutlineOutlinedIcon />} label="Active" onDelete={handleDelete} color="primary" variant="outlined" /></div>
                <div><Chip icon={<DateRangeIcon />} label="2015" onDelete={handleDelete} color="primary" variant="outlined" /></div>
                <div><Chip icon={<BookOutlinedIcon />} label="Criteria: 170.314(D)(6)" onDelete={handleDelete} color="primary" variant="outlined" /></div>
                <div><Chip icon={<GavelOutlinedIcon />} label="Has Compliance" onDelete={handleDelete} color="primary" variant="outlined" /></div>
                <div><Chip icon={<TuneOutlinedIcon />} label="Developer:Epic" onDelete={handleDelete} color="primary" variant="outlined" /></div>
              </div>
              {/*End of Table Filters*/}
              {/*Results & Table Actions*/}
              <div className={classes.chipsTableSubContainer}>
                <Typography variant='subtitle1'>Search Results:</Typography>
                <Typography variant='body1'>(189 Results)</Typography>
                <ButtonGroup className={classes.wrap}>
                  <Button fullWidth color="secondary" variant="contained">Download Results
                    <GetAppIcon className={classes.iconSpacing} />
                  </Button>
                  <Button fullWidth color="secondary" variant="contained">View Mode
                    <SettingsIcon className={classes.iconSpacing} />
                  </Button>
                </ButtonGroup>
              </div>
              {/*End Results & Table Actions*/}
            </div>
          </TableContainer>
          {/*Data Table*/}
          <TableContainer className={classes.tableContainer} component={Paper}>
            <Table stickyHeader>
              <ChplSortableHeaders
                headers={headers}
                onTableSort={handleTableSort}
              />
              <TableBody>
                {listings
                  .map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell className={classes.stickyColumn}>
                        <Typography color="primary" variant="subtitle1">
                          <a href='#'>{listing.chplProductNumber}</a>
                        </Typography>
                      </TableCell>
                      <TableCell>{listing.product}</TableCell>
                      <TableCell>{listing.edition}</TableCell>
                      <TableCell>
                        <a href='#'>{listing.developer}</a>
                      </TableCell>
                      <TableCell><a href='#'>{listing.rwtPlansUrl}</a></TableCell>
                      <TableCell><a href='#'>{listing.rwtResultsUrl}</a></TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/*End of Data Table*/}
          {/*Replace with CHPL Pagination*/}
          <TablePagination
            rowsPerPageOptions={[50, 100, 200, { label: 'All' }]}
            component="div"
          />
        </div>
        {/*End of Table View*/}
        {/*Card View*/}
        <div className={classes.cardContainer}>
          <div>
            {/*Filters Card View*/}
            <Typography gutterBottom variant='subtitle1'>Filters Applied:</Typography>
            <div className={classes.chipsSubContainer}>
              <div><Chip icon={<HelpOutlineOutlinedIcon />} label="Active" onDelete={handleDelete} color="primary" variant="outlined" /></div>
              <div><Chip icon={<DateRangeIcon />} label="2015" onDelete={handleDelete} color="primary" variant="outlined" /></div>
              <div><Chip icon={<BookOutlinedIcon />} label="Criteria: 170.314(D)(6)" onDelete={handleDelete} color="primary" variant="outlined" /></div>
              <div><Chip icon={<GavelOutlinedIcon />} label="Has Compliance" onDelete={handleDelete} color="primary" variant="outlined" /></div>
              <div><Chip icon={<TuneOutlinedIcon />} label="Developer:Epic" onDelete={handleDelete} color="primary" variant="outlined" /></div>
            </div>
            {/*End of Filter CardView*/}
          </div>
          {/*Results & Card Actions*/}

          <div>
            <div className={classes.productHeaderContainer}>
              <div className={`${classes.resultsContainer} ${classes.wrap}`}>
                <Typography variant='subtitle1'>Search Results:</Typography>
                <Typography variant='body1'>(189 Results)</Typography>
              </div>
              <ButtonGroup className={classes.wrap}>
                <Button fullWidth color="secondary" variant="contained">Download Results
                  <GetAppIcon className={classes.iconSpacing} />
                </Button>
                <Button fullWidth color="secondary" variant="contained">View Mode
                  <SettingsIcon className={classes.iconSpacing} />
                </Button>
                <Button fullWidth color="secondary" variant="contained">Sort
                  <ImportExportOutlinedIcon className={classes.iconSpacing} />
                </Button>
              </ButtonGroup>
            </div>
            {/*End Results & Card Actions*/}
            <div className={classes.productsContainer}>
              {/*Card Example 1*/}
              <Card className={classes.productCard} >
                <div className={classes.productCardHeaderContainer}>
                  <Avatar className={classes.developerAvatar}>EPIC</Avatar>
                  <div className={classes.subProductCardHeaderContainer}>
                    <Typography variant='h5'><a href='#'>Infection Control Antimicrobial Use and Resistance Reporting</a></Typography>
                    <div className={classes.versionProductCardHeaderContainer}>
                      <Typography variant='subtitle2'> Developer:</Typography>
                      <Typography variant='body1'><a href='#'> Epic Systems Corporation </a></Typography>
                    </div>
                  </div>
                </div>
                <Divider />
                <CardContent className={classes.cardContentOne}>
                  <div className={classes.subContent}>
                    <div>
                      <Typography variant='subtitle1'>
                        Edition{' '}
                      </Typography>
                      <Typography variant='body1'>
                        2015
                      </Typography>
                    </div>
                    <div>
                      <Typography variant='subtitle1'>
                        CHPL Product Number{' '}
                      </Typography>
                      <Typography variant='body1'>
                        <a href='#'>15.04.04.1447.Beac.AU.08.1.200220</a>
                      </Typography>
                    </div>
                  </div>
                  <div className={classes.subContent}>
                    <div>
                      <Typography variant='subtitle1'>
                        RWT Plans URL{' '}
                      </Typography>
                      <Typography variant='body1'>
                        <a href='#'>Access Here </a>
                      </Typography>
                    </div>
                    <div>
                      <Typography variant='subtitle1'>
                        RWT Plans URL{' '}
                      </Typography>
                      <Typography variant='body1'>
                        <a href='#'>Access Here </a>
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/*End Card Example 1*/}

              {/*Card Example 2*/}
              <Card className={classes.productCard} >
                <div className={classes.productCardHeaderContainer}>
                  <Avatar className={classes.developerAvatar}>EPIC</Avatar>
                  <div className={classes.subProductCardHeaderContainer}>
                    <Typography variant='h5'><a href='#'>Infection Control Antimicrobial Use and Resistance Reporting</a></Typography>
                    <div className={classes.versionProductCardHeaderContainer}>
                      <Typography variant='subtitle2'> Version:</Typography>
                      <Typography variant='body1'>May 2021</Typography>|
                      <Typography variant='subtitle2'> Developer:</Typography>
                      <Typography variant='body1'><a href='#'> Epic Systems Corporation </a></Typography>
                    </div>
                  </div>
                </div>
                <Divider />
                <CardContent className={classes.cardContentTwo}>
                  <div className={classes.subContent}>
                    <div>
                      <Typography variant='subtitle1'>
                        Edition{' '}
                      </Typography>
                      <Typography variant='body1'>
                        2015
                      </Typography>
                    </div>
                    <div>
                      <Typography variant='subtitle1'>
                        CHPL ID{' '}
                      </Typography>
                      <Typography variant='body1'>
                        15.04.04.1447.Beac.AU.08.1.200220
                      </Typography>
                    </div>
                  </div>
                  <div className={classes.subContent}>
                    <div>
                      <Typography variant='subtitle1'>
                        Certification Data{' '}
                      </Typography>
                      <Typography variant='body1'>
                        Access Here
                      </Typography>
                    </div>
                    <div>
                      <Typography variant='subtitle1'>
                        Status{' '}
                      </Typography>
                      <Typography variant='body1'>
                        Active <BeenhereIcon className={classes.activeStatus} />
                      </Typography>
                      <Typography variant='body1'>
                        Suspended by ONC<BeenhereIcon className={classes.activeStatus} />
                      </Typography>
                      <Typography variant='body1'>
                        Suspended by ONC-ACB<BeenhereIcon className={classes.activeStatus} />
                      </Typography>
                      <Typography variant='body1'>
                        Terminated by ONC<BeenhereIcon className={classes.activeStatus} />
                      </Typography>
                      <Typography variant='body1'>
                        Withdrawn by ONC-ACB<BeenhereIcon className={classes.activeStatus} />
                      </Typography>
                      <Typography variant='body1'>
                        Withdrawn by Developer Under Surveillance/Review	 <BeenhereIcon className={classes.activeStatus} />
                      </Typography>
                      <Typography variant='body1'>
                        Withdrawn by Developer<BeenhereIcon className={classes.activeStatus} />
                      </Typography>
                      <Typography variant='body1'>
                        Retired<BeenhereIcon className={classes.activeStatus} />
                      </Typography>
                    </div>
                  </div>
                  <div className={classes.widgetProductContainer}>
                    <div>
                      <Button color='secondary' variant='contained' fullWidth>
                        CERT ID
                        <AssignmentOutlinedIcon className={classes.iconSpacing}
                        />
                      </Button>
                    </div>
                    <div>
                      <Button color='secondary' variant='contained' fullWidth>
                        COMPARE
                        <CompareArrowsIcon className={classes.iconSpacing}
                        />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/*End of Card Example 2*/}

              <TablePagination
                rowsPerPageOptions={[50, 100, 200, { label: 'All' }]}
                component="div"
              />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default rwt;
