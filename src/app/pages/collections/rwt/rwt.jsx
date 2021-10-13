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

import theme from '../../../themes/theme';
import ChplSortableHeaders from '../../../components/util/chpl-sortable-headers';
import SgAdvancedSearch from '../../../pages/resources/style-guide/sg-advanced-search';
import SgDefaultFilter from '../../../pages/resources/style-guide/sg-default-filter';
import SgProductCard from '../../../pages/resources/style-guide/sg-product-card'

import BeenhereIcon from '@material-ui/icons/Beenhere';
import GetAppIcon from '@material-ui/icons/GetApp';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import SearchIcon from '@material-ui/icons/Search';
import RestoreIcon from '@material-ui/icons/Restore';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';

const useStyles = makeStyles({
  content: {
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'start',
  },
  chipsTableSubContainer: {
    alignItems:'center',
    display: 'flex',
    gap: '8px',
    justifyContent: 'start',
    gridTemplateColumns: 'auto auto',
    padding: '8px 0px',
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
  table: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    alignItems: 'start',
    padding: '0 32px ',
    backgroundColor: '#f9f9f9',
  },
  container: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr",
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
    flexWrap:'wrap',
    paddingBottom: '8px',
    paddingTop: '8px',
    gap: '8px',
  },
  widgetContainer: {
    gap: '8px',
    display: 'grid',
    alignContent: 'space-between',
  },
  iconSpacing: {
    marginLeft: '4px',
  },
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
    gap: '16px',
    gridTemplateColumns: 'auto 8fr 2fr auto',
  },
  title: {
    flexGrow: 1,
  },
  chplLogo: {
    maxWidth: '300px',
    padding: '4px',
  },
  productCard: {
    paddingBottom: '8px',
  },
  productCardHeaderContainer: {
    display: 'grid',
    gridTemplateColumns: 'auto 11fr',
    padding: '16px',
    gap: '16px',
    alignItems: 'center',
  },
  subProductCardHeaderContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
  },
  versionProductCardHeaderContainer: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto auto 1fr',
    gap: '8px',
    alignItems: 'center',
  },
  widgetProductContainer: {
    alignContent: 'space-between',
    display: 'grid',
    gap: '8px',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    gap: '8px',
  },
  subcontent: {
    display: 'grid',
    gap: '8px',
  },
  developerAvatar: {
    color: '#156dac',
    backgroundColor: '#f5f9fd',
  },
  activeStatus: {
    color: '#66926d',
    marginLeft: '4px',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: '3fr 9fr',
    gap: '32px',
    padding: '32px',
    backgroundColor:'#f9f9f9',
    overflowY: 'scroll',
  },
  productsContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '16px',
    padding: '8px 0px',
  },
  chipsSubContainer: {
    display: 'grid',
    gap: '8px',
    justifyContent: 'start',
    gridTemplateColumns: 'auto auto',
    padding: '8px 0px',
  },
  productHeaderContainer: {
    display: 'grid',
    gap: '8px',
    justifyContent: 'start',
    gridTemplateColumns: 'auto auto',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultsContainer: {
    display: 'grid',
    gap: '8px',
    justifyContent: 'start',
    gridTemplateColumns: 'auto auto',
    alignItems: 'center',
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
      rwtPlansUrl: 'Epic 2017',
      rwtResultsUrl: 'July, 2021',
      status: 'OPEN',
      actions: 'Y | N',
    }, {
      id: 2,
      chplProductNumber: '15.07.07.1447.SY01.01.00.1.160505',
      developer: 'Epic Systems Corporation',
      product: 'Syndromic Surveillance Reporting',
      edition: '2015',
      rwtPlansUrl: 'Epic 2017',
      rwtResultsUrl: 'July, 2021',
      status: 'OPEN',
      actions: 'Y | N',
    }, {
      id: 3,
      chplProductNumber: '15.07.07.1447.BE01.01.00.1.160505',
      developer: 'Epic Systems Corporation',
      product: 'Beaker Reportable Labs Reporting',
      edition: '2015',
      rwtPlansUrl: 'Epic 2017',
      rwtResultsUrl: 'July, 2021',
      status: 'OPEN',
      actions: 'Y | N',
    }, {
      id: 4,
      chplProductNumber: '15.04.04.2657.Care.01.00.0.160701',
      developer: 'Carefluence',
      product: 'Carefluence Open API',
      edition: '2015',
      rwtPlansUrl: 'Epic 2017',
      rwtResultsUrl: 'July, 2021',
      status: 'OPEN',
      actions: 'Y | N',
    }, {
      id: 5,
      chplProductNumber: '15.04.04.2980.Modu.09.00.1.160728',
      developer: 'ModuleMD',
      product: 'ModuleMD WISE™',
      edition: '2015',
      rwtPlansUrl: 'Epic 2017',
      rwtResultsUrl: 'July, 2021',
      status: 'CLOSED',
      actions: 'Y | N',
    }, {
      id: 6,
      chplProductNumber: '15.04.04.2891.Alls.17.00.0.160728',
      developer: 'Allscripts',
      product: 'Allscripts TouchWorks EHR',
      edition: '2015',
      rwtPlansUrl: 'Epic 2017',
      rwtResultsUrl: 'July, 2021',
      status: 'CLOSED',
      actions: 'Y | N',
    }, {
      id: 7,
      chplProductNumber: '15.04.04.2891.Alls.AC.00.1.160804',
      developer: 'Allscripts',
      product: 'Allscripts Sunrise Acute Care',
      edition: '2015',
      rwtPlansUrl: 'Epic 2017',
      rwtResultsUrl: 'July, 2021',
      status: 'CLOSED',
      actions: 'Y | N',
    }, {
      id: 8,
      chplProductNumber: '15.04.04.2891.Alls.AM.00.1.160804',
      developer: 'Allscripts',
      product: 'Allscripts Sunrise Ambulatory Care',
      edition: '2015',
      rwtPlansUrl: 'Epic 2017',
      rwtResultsUrl: 'July, 2021',
      status: 'CLOSED',
      actions: 'Y | N',
    }, {
      id: 9,
      chplProductNumber: '15.07.07.1447.EP03.01.00.1.160720',
      developer: 'Epic Systems Corporation',
      product: 'EpicCare Ambulatory EHR Suite',
      edition: '2015',
      rwtPlansUrl: 'Epic 2017',
      rwtResultsUrl: 'July, 2021',
      status: 'CLOSED',
      actions: 'Y | N',
    }, {
      id: 10,
      chplProductNumber: '15.07.07.1447.EP04.01.00.1.160720',
      developer: 'Epic Systems Corporation',
      product: 'EpicCare Inpatient EHR Suite',
      edition: '2015',
      rwtPlansUrl: 'Epic 2017',
      rwtResultsUrl: 'July, 2021',
      status: 'CLOSED',
      actions: 'Y | N',
    }, {
      id: 11,
      chplProductNumber: '15.07.07.1447.BE02.01.00.1.160815',
      developer: 'Epic Systems Corporation',
      product: 'Beacon Cancer Registry Reporting',
      edition: '2015',
      rwtPlansUrl: 'Epic 2017',
      rwtResultsUrl: 'July, 2021',
      status: 'CLOSED',
      actions: 'Y | N',
    }, {
      id: 12,
      chplProductNumber: '15.07.07.2713.CQ01.01.00.1.160916',
      developer: 'Dynamic Health IT, Inc',
      product: 'CQMsolution',
      edition: '2015',
      rwtPlansUrl: 'Epic 2017',
      rwtResultsUrl: 'July, 2021',
      status: 'CLOSED',
      actions: 'Y | N',
    }, {
      id: 13,
      chplProductNumber: '15.07.07.1447.BE01.02.01.1.161014',
      developer: 'Epic Systems Corporation',
      product: 'Beaker Reportable Labs Reporting',
      rwtPlansUrl: 'Epic 2015',
      rwtResultsUrl: 'July, 2021',
      status: 'CLOSED',
      actions: 'Y | N',
    }, {
      id: 14,
      chplProductNumber: '15.07.07.1447.BE01.02.01.1.161014',
      developer: 'Epic Systems Corporation',
      product: 'Beaker Reportable Labs Reporting',
      edition: '2015',
      rwtPlansUrl: 'Epic 2017',
      rwtResultsUrl: 'July, 2021',
      status: 'CLOSED',
      actions: 'Y | N',
    }, {
      id: 15,
      chplProductNumber: '15.07.07.1447.BE01.02.01.1.161014',
      developer: 'Epic Systems Corporation',
      product: 'Beaker Reportable Labs Reporting',
      edition: '2015',
      rwtPlansUrl: 'Epic 2017',
      rwtResultsUrl: 'July, 2021',
      status: 'CLOSED',
      actions: 'Y | N',
    }, {
      id: 16,
      chplProductNumber: '15.07.07.1447.BE01.02.01.1.161014',
      developer: 'Epic Systems Corporation',
      product: 'Beaker Reportable Labs Reporting',
      edition: '2015',
      rwtPlansUrl: 'Epic 2017',
      rwtResultsUrl: 'July, 2021',
      status: 'CLOSED',
      actions: 'Y | N',
    },
  ]);

  const headers = [
    { text: 'CHPL Product Number', property: 'chplProductNumber', sortable: true},
    { text: 'Product', property: 'product', sortable: true },
    { text: 'Edition', property: 'edition', sortable: true },
    { text: 'Developer', property: 'developer', sortable: true },
    { text: 'RWT Plans Url', property: 'rwtPlansUrl', sortable: true },
    { text: 'RWT Results Url', property: 'rwtResultsUrl', sortable: true },
    { text: 'Status', property: 'status', sortable: true },
    { text: 'Actions', property: 'actions', invisible: true, sortable: false },
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
      {/*Table View*/}
      <div className={classes.container}>
        <div className={classes.rowHeader}>
          <Typography variant="h1">Collections Page</Typography>
        </div>
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
                <Button color="primary" variant="contained">Download ALL <GetAppIcon className={classes.iconSpacing}/></Button>
              </CardActions>
            </Card>
          </div>
          <Divider />
        </div>
        <div className={classes.table}>
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
              <ButtonGroup variant="text" size="medium">
                <Button color="primary">Restore Search <RestoreIcon className={classes.iconSpacing} /></Button>
                <SgAdvancedSearch />
              </ButtonGroup>
            </div>
          </Toolbar>
          <TableContainer>
            <div className={classes.tableActionContainer} component={Paper}>
              <div className={classes.chipsTableSubContainer}>
                <Typography gutterBottom>Filters Applied:</Typography>
                <div><Chip label="Active" onDelete={handleDelete} color="primary" variant="outlined" /></div>
                <div><Chip label="Suspended (ONC)" onDelete={handleDelete} color="primary" variant="outlined" /></div>
                <div><Chip label="Suspended (ACB)" onDelete={handleDelete} color="primary" variant="outlined" /></div>
                <div><Chip label="2015 Cures Editiion" onDelete={handleDelete} color="primary" variant="outlined"/></div>
                <div><Chip label="2015" onDelete={handleDelete} color="primary" variant="outlined" /></div>
              </div>
              <div className={classes.chipsTableSubContainer}>
              <Typography variant='h3'>Search Results:</Typography>
                <Typography variant='h4'>(189 Results)</Typography>
              </div>
              <ButtonGroup>
                <Button fullWidth color="secondary" variant="contained">Download Results
                  <GetAppIcon className={classes.iconSpacing} />
                </Button>
                <Button fullWidth color="secondary" variant="contained">View Mode
                  <SettingsIcon className={classes.iconSpacing} />
                </Button>
              </ButtonGroup>
            </div>
          </TableContainer>
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
                        <Button color="primary" variant="contained">
                          {listing.chplProductNumber}
                          <ArrowForwardIcon className={classes.iconSpacing} />
                        </Button>
                      </TableCell>
                      <TableCell>{listing.product}</TableCell>
                      <TableCell>{listing.edition}</TableCell>
                      <TableCell>
                        <a href='#'>{listing.developer}</a>
                      </TableCell>
                      <TableCell><a href='#'>{listing.rwtPlansUrl}</a></TableCell>
                      <TableCell><a href='#'>{listing.rwtResultsUrl}</a></TableCell>
                      <TableCell>{listing.status}</TableCell>
                      <TableCell align="right">
                        <Button fullWidth color="secondary" variant="contained">
                          CERT ID
                          <AssignmentOutlinedIcon className={classes.iconSpacing} />
                        </Button>
                        <Button fullWidth color="secondary" variant="contained">
                          Compare
                          <CompareArrowsIcon className={classes.iconSpacing} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[50, 100, 200, { label: 'All' }]}
            component="div"
          />
        </div>
      </div>

      {/*Card View*/}
      <div className={classes.container}>
      <div className={classes.cardContainer}>
        <div>
          <Typography gutterBottom variant='h3'>Filters Applied:</Typography>
          <div className={classes.chipsSubContainer}>
              <div><Chip label="Active" onDelete={handleDelete} color="primary" variant="outlined"/></div>
              <div><Chip label="Suspended (ONC)" onDelete={handleDelete} color="primary" variant="outlined" /></div>
              <div><Chip label="Suspended (ACB)" onDelete={handleDelete} color="primary" variant="outlined" /></div>
              <div><Chip label="2015 Cures Editiion" onDelete={handleDelete} color="primary" variant="outlined" /></div>
              <div><Chip label="2015" onDelete={handleDelete} color="primary" variant="outlined" /></div>
          </div>
          <br />
          <Divider />
        </div>
        <div>
          <div className={classes.productHeaderContainer}>
            <div className={classes.resultsContainer}>
              <Typography variant='h3'>Search Results:</Typography>
              <Typography variant='h4'>(189 Results)</Typography>
            </div>
              <ButtonGroup>
                <Button fullWidth color="secondary" variant="contained">Download Results
                  <GetAppIcon className={classes.iconSpacing} />
                </Button>
                <Button fullWidth color="secondary" variant="contained">View Mode
                  <SettingsIcon className={classes.iconSpacing} />
                </Button>
                <Button fullWidth color="secondary" variant="contained">Sort
                  <SettingsIcon className={classes.iconSpacing} />
                </Button>
              </ButtonGroup>
          </div>
          <div className={classes.productsContainer}>
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
                <CardContent className={classes.content}>
                  <div className={classes.subcontent}>
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
                  <div className={classes.subcontent}>
                    <div>
                      <Typography variant='subtitle1'>
                        Certification Data{' '}
                      </Typography>
                      <Typography variant='body1'>
                        May 12, 2021
                      </Typography>
                    </div>
                    <div>
                      <Typography variant='subtitle1'>
                        Status{' '}
                      </Typography>
                      <Typography variant='body1'>
                        Active <BeenhereIcon className={classes.activeStatus} />
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
                <CardContent className={classes.content}>
                  <div className={classes.subcontent}>
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
                  <div className={classes.subcontent}>
                    <div>
                      <Typography variant='subtitle1'>
                        Certification Data{' '}
                      </Typography>
                      <Typography variant='body1'>
                        May 12, 2021
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
                <CardContent className={classes.content}>
                  <div className={classes.subcontent}>
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
                  <div className={classes.subcontent}>
                    <div>
                      <Typography variant='subtitle1'>
                        Certification Data{' '}
                      </Typography>
                      <Typography variant='body1'>
                        May 12, 2021
                      </Typography>
                    </div>
                    <div>
                      <Typography variant='subtitle1'>
                        Status{' '}
                      </Typography>
                      <Typography variant='body1'>
                        Active <BeenhereIcon className={classes.activeStatus} />
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
