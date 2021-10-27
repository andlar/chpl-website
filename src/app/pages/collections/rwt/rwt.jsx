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
  IconButton,
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
import ChplTooltip from '../../../components/util/chpl-tooltip';
import SgAdvancedSearch from '../../../pages/resources/style-guide/sg-advanced-search';

{/*Icons*/ }
import ClearIcon from '@material-ui/icons/Clear';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import GetAppIcon from '@material-ui/icons/GetApp';
import SettingsIcon from '@material-ui/icons/Settings';
import ImportExportOutlinedIcon from '@material-ui/icons/ImportExportOutlined';
import InfoIcon from '@material-ui/icons/Info';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import SearchIcon from '@material-ui/icons/Search';
import RestoreIcon from '@material-ui/icons/Restore';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import DateRangeIcon from '@material-ui/icons/DateRange';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';

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
    gap: '32px',
    gridTemplateColumns: '1fr',
    alignItems: 'start',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
  dividerSpacing: {
    marginLeft: '4px 0px',
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
    margin: '0px 32px',
    width: 'auto',
  },
  tableActionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '8px 32px',
    gap: '8px',
    backgroundColor: '#fafdff',
    borderBottom: '1px solid #bbb',
    boxShadow: 'rgba(149, 157, 165, 0.1) 8px 0px 8px',
  },
  tableResultsHeaderContainer: {
    display: 'grid',
    gap: '8px',
    margin: '16px 32px',
    justifyContent: 'start',
    gridTemplateColumns: '1fr',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'auto auto',
    },
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
    padding: '16px 32px',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '16px',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'auto 6fr 2fr 3fr',
    },
  },
  //Card View Styling
  activeStatus: {
    color: '#66926d',
    marginLeft: '4px',
  },
  developerAvatar: {
    color: 'white',
    backgroundColor: 'green',
  },
  cardView: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '32px',
    backgroundColor: '#f9f9f9',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '3fr 9fr',
    },
  },
  cardHeader: {
    fontWeight: '600',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    padding: '16px 32px 16px 0',
  },
  cardContentOne: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '8px',
    padding: '8px 16px',
    "&:last-child": {
      paddingBottom: '8px',
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 1fr 1fr',
      overflowWrap: 'anywhere',
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
  chipsContainer: {
    borderRight: '1px solid #bbb',
    borderBottom: '1px solid #bbb',
    boxShadow: 'rgba(149, 157, 165, 0.1) 8px 0px 8px',
    padding: '32px 32px',
    backgroundColor: '#fafdff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    gap: '8px',
  },
  chipsSubContainer: {
    display: 'grid',
    gap: '16px',
    paddingBottom: '16px',
    paddingTop: '8px',
    justifyContent: 'start',
    gridTemplateColumns: 'auto',
    borderTop: '1px solid #bbb',

  },
  chipsSubCategory: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '8px',
  },
  productCard: {
    paddingBottom: '8px',
  },
  productCardHeaderContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    padding: '16px 0 8px 16px',
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
    margin: '8px 0px',
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
      rwtPlansUrl: 'https://mui.com/components/icons/#heading-material-icons',
      rwtResultsUrl: 'https://mui.com/getting-started/usage/',
      version: '1.5',
      actions: 'Y | N',
    }, {
      id: 2,
      chplProductNumber: '15.07.07.1447.SY01.01.00.1.160505',
      developer: 'Epic Systems Corporation',
      product: 'Syndromic Surveillance Reporting',
      edition: '2015',
      rwtPlansUrl: 'https://mui.com/components/icons/#heading-material-icons',
      rwtResultsUrl: 'https://mui.com/getting-started/usage/',
      version: '1.7',
      actions: 'Y | N',
    }, {
      id: 3,
      chplProductNumber: '15.07.07.1447.BE01.01.00.1.160505',
      developer: 'Epic Systems Corporation',
      product: 'Beaker Reportable Labs Reporting',
      edition: '2015',
      rwtPlansUrl: 'https://mui.com/components/icons/#heading-material-icons',
      rwtResultsUrl: 'https://mui.com/getting-started/usage/',
      version: '1.3',
      actions: 'Y | N',
    }, {
      id: 4,
      chplProductNumber: '15.04.04.2657.Care.01.00.0.160701',
      developer: 'Carefluence',
      product: 'Carefluence 2.3 API',
      edition: '2015',
      rwtPlansUrl: 'https://mui.com/components/icons/#heading-material-icons',
      rwtResultsUrl: 'https://mui.com',
      version: '2.8',
      actions: 'Y | N',
    }, {
      id: 5,
      chplProductNumber: '15.04.04.2980.Modu.09.00.1.160728',
      developer: 'ModuleMD',
      product: 'ModuleMD WISE™',
      edition: '2015',
      rwtPlansUrl: 'https://mui.com/components/icons/#heading-material-icons',
      rwtResultsUrl: 'https://mui.com/components',
      version: '1',
      actions: 'Y | N',
    }, {
      id: 6,
      chplProductNumber: '15.04.04.2891.Alls.17.00.0.160728',
      developer: 'Allscripts',
      product: 'Allscripts TouchWorks EHR',
      edition: '2015',
      rwtPlansUrl: 'https://mui.com/components/icons/#heading-material-icons',
      rwtResultsUrl: 'https://mui.com/components/icons/#heading-material-icons',
      version: '1',
      actions: 'Y | N',
    }, {
      id: 7,
      chplProductNumber: '15.04.04.2891.Alls.AC.00.1.160804',
      developer: 'Allscripts',
      product: 'Allscripts Sunrise Acute Care',
      edition: '2015',
      rwtPlansUrl: 'https://mui.com/components/icons/#heading-material-icons',
      rwtResultsUrl: 'https://mui.com/components/icons/#heading-material-icons',
      version: '1',
      actions: 'Y | N',
    }, {
      id: 8,
      chplProductNumber: '15.04.04.2891.Alls.AM.00.1.160804',
      developer: 'Allscripts',
      product: 'Allscripts Sunrise Ambulatory Care',
      edition: '2015',
      rwtPlansUrl: 'https://mui.com/components/icons/#heading-material-icons',
      rwtResultsUrl: 'https://mui.com/components/icons/#heading-material-icons',
      version: '1',
      actions: 'Y | N',
    }, {
      id: 9,
      chplProductNumber: '15.07.07.1447.EP03.01.00.1.160720',
      developer: 'Epic Systems Corporation',
      product: 'EpicCare Ambulatory EHR Suite',
      edition: '2015',
      rwtPlansUrl: 'https://mui.com/components/icons/#heading-material-icons',
      rwtResultsUrl: 'https://mui.com/components/icons/#heading-material-icons',
      version: '1',
      actions: 'Y | N',
    }, {
      id: 10,
      chplProductNumber: '15.07.07.1447.EP04.01.00.1.160720',
      developer: 'Epic Systems Corporation',
      product: 'EpicCare Inpatient EHR Suite',
      edition: '2015',
      rwtPlansUrl: 'https://mui.com/components/icons/#heading-material-icons',
      rwtResultsUrl: 'https://mui.com/components/icons/#heading-material-icons',
      version: '1',
      actions: 'Y | N',
    }, {
      id: 11,
      chplProductNumber: '15.07.07.1447.BE02.01.00.1.160815',
      developer: 'Epic Systems Corporation',
      product: 'Beacon Cancer Registry Reporting',
      edition: '2015',
      rwtPlansUrl: 'https://mui.com/components/icons/#heading-material-icons',
      rwtResultsUrl: 'https://mui.com/components/icons/#heading-material-icons',
      version: '1',
      actions: 'Y | N',
    }, {
      id: 12,
      chplProductNumber: '15.07.07.2713.CQ01.01.00.1.160916',
      developer: 'Dynamic Health IT, Inc',
      product: 'CQMsolution',
      edition: '2015',
      rwtPlansUrl: 'https://mui.com/components/icons/#heading-material-icons',
      rwtResultsUrl: 'https://mui.com/components/icons/#heading-material-icons',
      version: '1',
      actions: 'Y | N',
    }, {
      id: 13,
      chplProductNumber: '15.07.07.1447.BE01.02.01.1.161014',
      developer: 'Epic Systems Corporation',
      product: 'Beaker Reportable Labs Reporting',
      rwtPlansUrl: 'https://mui.com/components/icons/#heading-material-icons',
      rwtResultsUrl: 'https://mui.com/components/icons/#heading-material-icons',
      version: '1',
      actions: 'Y | N',
    }, {
      id: 14,
      chplProductNumber: '15.07.07.1447.BE01.02.01.1.161014',
      developer: 'Epic Systems Corporation',
      product: 'Beaker Reportable Labs Reporting',
      edition: '2015',
      rwtPlansUrl: 'https://mui.com/components/icons/#heading-material-icons',
      rwtResultsUrl: 'https://mui.com/components/icons/#heading-material-icons',
      version: '1',
      actions: 'Y | N',
    }, {
      id: 15,
      chplProductNumber: '15.07.07.1447.BE01.02.01.1.161014',
      developer: 'Epic Systems Corporation',
      product: 'Beaker Reportable Labs Reporting',
      edition: '2015',
      rwtPlansUrl: 'https://mui.com/components/icons/#heading-material-icons',
      rwtResultsUrl: 'https://mui.com/components/icons/#heading-material-icons',
      version: '1',
      actions: 'Y | N',
    }, {
      id: 16,
      chplProductNumber: '15.07.07.1447.BE01.02.01.1.161014',
      developer: 'Epic Systems Corporation',
      product: 'Beaker Reportable Labs Reporting',
      edition: '2015',
      rwtPlansUrl: 'https://mui.com/components/icons/#heading-material-icons',
      rwtResultsUrl: 'https://mui.com/components/icons/#heading-material-icons',
      version: '1',
      actions: 'Y | N',
    },
  ]);

  const headers = [
    { text: 'CHPL Product ID', property: 'chplProductNumber', sortable: true },
    { text: 'Edition', property: 'edition', sortable: true },
    { text: 'Developer', property: 'developer', sortable: true },
    { text: 'Product', property: 'product', sortable: true },
    { text: 'Version', property: 'version', sortable: true },
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
        </div>
        <br/>
        <br/>
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
              </div>
            </div>
            <div><Button fullWidth variant="outlined" color="primary">Browse All<ExploreOutlinedIcon className={classes.iconSpacing} /></Button>
            </div>
            <div>
              <ButtonGroup fullWidth variant="text">
                <Button fullWidth color="primary">Restore Search <RestoreIcon className={classes.iconSpacing} /></Button>
                {/*Advanced Search in found in style guide*/}
                <Button fullWidth color="primary"><SgAdvancedSearch /></Button>
              </ButtonGroup>
            </div>
          </Toolbar>
          {/*End of Search Bar*/}
          {/*Card View*/}
          <div className={classes.cardView}>
            <div className={classes.chipsContainer}>
              {/*Filters Card View*/}
              <Typography variant='subtitle1'>Filters Applied:
                <InfoIcon className={classes.iconSpacing} color='primary' />
              </Typography>
              <div className={classes.chipsSubContainer}>
                <div>
                  <Typography gutterBottom variant='subtitle2'>Status:
                    <HelpOutlineOutlinedIcon className={classes.iconSpacing} color='primary' />
                  </Typography>
                  <div className={classes.chipsSubCategory}>
                    <Chip icon={<HelpOutlineOutlinedIcon />} label="Active" onDelete={handleDelete} color="primary" variant="outlined" />
                    <Chip icon={<HelpOutlineOutlinedIcon />} label="Suspended by ONC" onDelete={handleDelete} color="primary" variant="outlined" />
                    <Chip icon={<HelpOutlineOutlinedIcon />} label="Suspended by ONC/ACB" onDelete={handleDelete} color="primary" variant="outlined" />
                  </div>
                </div>
                <div>
                  <Typography gutterBottom variant='subtitle2'>Date Range:</Typography>
                  <Chip icon={<DateRangeIcon />} label="2015" onDelete={handleDelete} color="primary" variant="outlined" />
                </div>
                <div>
                  <Typography gutterBottom variant='subtitle2'>Criteria:</Typography>
                  <Chip icon={<BookOutlinedIcon />} label="170.314(D)(6)" onDelete={handleDelete} color="primary" variant="outlined" />
                </div>
                <div>
                  <Typography gutterBottom variant='subtitle2'>Surveillance</Typography>
                  <Chip icon={<VerifiedUserOutlinedIcon />} label="Has Compliance" onDelete={handleDelete} color="primary" variant="outlined" />
                </div>
                <div>
                  <Typography gutterBottom variant='subtitle2'>Other:</Typography>
                  <Chip icon={<TuneOutlinedIcon />} label="Epic" onDelete={handleDelete} color="primary" variant="outlined" /></div>
              </div>
              <Button variant="contained" color="default" fullWidth>Clear All Filters <ClearIcon className={classes.iconSpacing} /></Button>
              {/*End of Filter CardView*/}
            </div>
            {/*Results & Card Actions*/}
            <div className={classes.cardContainer}>
              <div className={classes.productHeaderContainer}>
                <div className={`${classes.resultsContainer} ${classes.wrap}`}>
                  <Typography variant='subtitle2'>Search Results:</Typography>
                  <Typography variant='body2'>(1-25 of 75 Results)</Typography>
                </div>
                <ButtonGroup size='small' className={classes.wrap}>
                  <Button color="secondary" variant="contained" fullWidth>Download Results
                    <GetAppIcon className={classes.iconSpacing} />
                  </Button>
                  <Button color="secondary" variant="contained" fullWidth>View Mode
                    <SettingsIcon className={classes.iconSpacing} />
                  </Button>
                  <Button color="secondary" variant="contained" fullWidth>Sort
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
                      <Typography className={classes.cardHeader} variant='h5'>Infection Control Antimicrobial Use and Resistance Reporting</Typography>
                      <div className={classes.versionProductCardHeaderContainer}>
                        <Typography variant='subtitle2'> Developer:</Typography>
                        <Typography variant='body1'><a href='#'> Epic Systems Corporation </a></Typography>|
                        <Typography variant='subtitle2'>CHPL Product ID:</Typography>
                        <Typography variant='body1'><a href='#'>15.04.04.1447.Beac.AU.08.1.200220</a></Typography>
                      </div>
                    </div>
                  </div>
                  <Divider />
                  <CardContent className={classes.cardContentOne}>
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
                        RWT Plans URL
                      </Typography>
                      <Typography variant='body1'>
                        <a href='#'>https://mui.com/components/icons/#heading-material-icons </a>
                      </Typography>
                    </div>
                    <div>
                      <Typography variant='subtitle1'>
                        RWT Results URL
                      </Typography>
                      <Typography variant='body1'>
                        <a href='#'>https://mui.com/components/icons/#heading-material-icons </a>
                      </Typography>

                    </div>
                  </CardContent>
                </Card>
                {/*End Card Example 1*/}

                {/*Card Example 1*/}
                <Card className={classes.productCard} >
                  <div className={classes.productCardHeaderContainer}>
                    <Avatar className={classes.developerAvatar}>EPIC</Avatar>
                    <div className={classes.subProductCardHeaderContainer}>
                      <Typography className={classes.cardHeader} variant='h5'>Infection Control App</Typography>
                      <div className={classes.versionProductCardHeaderContainer}>
                        <Typography variant='subtitle2'> Developer:</Typography>
                        <Typography variant='body1'><a href='#'> Epic Systems Corporation </a></Typography>|
                        <Typography variant='subtitle2'>CHPL Product ID:</Typography>
                        <Typography variant='body1'><a href='#'>15.04.04.1447.Beac.AU.08.1.200220</a></Typography>
                      </div>
                    </div>
                  </div>
                  <Divider />
                  <CardContent className={classes.cardContentOne}>
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
                        RWT Plans URL
                      </Typography>
                      <Typography variant='body1'>
                        <a href='#'>https://epic.com/infection/app </a>
                      </Typography>
                    </div>
                    <div>
                      <Typography variant='subtitle1'>
                        RWT Results URL
                      </Typography>
                      <Typography variant='body1'>
                        <a href='#'>https://epic.com/infection/app/rwt </a>
                      </Typography>

                    </div>
                  </CardContent>
                </Card>
                {/*End Card Example 1*/}

                {/*Card Example 1*/}
                <Card className={classes.productCard} >
                  <div className={classes.productCardHeaderContainer}>
                    <Avatar className={classes.developerAvatar}>EPIC</Avatar>
                    <div className={classes.subProductCardHeaderContainer}>
                      <Typography className={classes.cardHeader} variant='h5'>Syndromic Surveillance Reporting</Typography>
                      <div className={classes.versionProductCardHeaderContainer}>
                        <Typography variant='subtitle2'> Developer:</Typography>
                        <Typography variant='body1'><a href='#'> Epic Systems Corporation </a></Typography>|
                        <Typography variant='subtitle2'>CHPL Product ID:</Typography>
                        <Typography variant='body1'><a href='#'>15.04.04.1447.Nati.21.07.1.210825	</a></Typography>
                      </div>
                    </div>
                  </div>
                  <Divider />
                  <CardContent className={classes.cardContentOne}>
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
                        RWT Plans URL
                      </Typography>
                      <Typography variant='body1'>
                        <a href='#'>https://epic.com/infection/app </a>
                      </Typography>
                    </div>
                    <div>
                      <Typography variant='subtitle1'>
                        RWT Results URL
                      </Typography>
                      <Typography variant='body1'>
                        <a href='#'>https://epic.com/infection/app/rwt </a>
                      </Typography>

                    </div>
                  </CardContent>
                </Card>
                {/*End Card Example 1*/}

                {/*Card Example 2*/}
                <Card className={classes.productCard} >
                  <div className={classes.productCardHeaderContainer}>
                    <Avatar className={classes.developerAvatar}>EPIC</Avatar>
                    <div className={classes.subProductCardHeaderContainer}>
                      <Typography variant='h5'>Epic Card1</Typography>
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
          <br />
          <br />
          {/*Table View Is Below with Additional Search Bar for real life example*/}
          <br />
          <br />
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
              </div>
            </div>
            <div><Button fullWidth variant="outlined" color="primary">Browse All<ExploreOutlinedIcon className={classes.iconSpacing} /></Button>
            </div>
            <div>
              <ButtonGroup fullWidth variant="text">
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
                <div><Chip icon={<VerifiedUserOutlinedIcon />} label="Has Compliance" onDelete={handleDelete} color="primary" variant="outlined" /></div>
                <div><Chip icon={<TuneOutlinedIcon />} label="Developer:Epic" onDelete={handleDelete} color="primary" variant="outlined" /></div>
                <Button variant="contained" size="small" color="default" >Clear All Filters <ClearIcon className={classes.iconSpacing} /></Button>
              </div>
              {/*End of Table Filters*/}
            </div>
          </TableContainer>
          {/*Data Table*/}
          {/*Results & Table Actions*/}
          <div className={classes.tableResultsHeaderContainer}>
            <div className={`${classes.resultsContainer} ${classes.wrap}`}>
              <Typography variant='subtitle2'>Search Results:</Typography>
              <Typography variant='body2'>(1-25 of 75 Results)</Typography>
            </div>
            <ButtonGroup size='small' className={classes.wrap}>
              <Button color="secondary" variant="contained" fullWidth>Download Results
                <GetAppIcon className={classes.iconSpacing} />
              </Button>
              <Button color="secondary" variant="contained" fullWidth>View Mode
                <SettingsIcon className={classes.iconSpacing} />
              </Button>
            </ButtonGroup>
          </div>
          {/*End Results & Table Actions*/}
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
                      <TableCell>{listing.edition}</TableCell>
                      <TableCell><a href='#'>{listing.developer}</a></TableCell>
                      <TableCell>
                       {listing.product}
                      </TableCell>
                      <TableCell>
                        {listing.version}
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
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
        {/*End of Table View*/}

      </div>
    </ThemeProvider >
  );
}

export default rwt;
