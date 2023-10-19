import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  MenuItem,
  Typography,
  makeStyles,
} from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';
import GetAppIcon from '@material-ui/icons/GetApp';

import { ChplTextField } from 'components/util';
import { getAngularService } from 'services/angular-react-helper';
import { UserContext } from 'shared/contexts';
import { palette, theme, utilStyles } from 'themes';

const useStyles = makeStyles({
  ...utilStyles,
  pageHeader: {
    padding: '32px',
  },
  pageBody: {
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: '1fr',
    padding: '32px',
    backgroundColor: palette.background,
  },
  content: {
    display: 'grid',
    gap: '64px',
    alignItems: 'start',
    gridTemplateColumns: '1fr',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '2fr 1fr',
    },
  },
  listSpacing: {
    '& li': {
      lineHeight: '1.3em',
      marginBottom: '.7em',
      marginTop: '.7em',
    },
  },
  listHeaders: {
    marginBottom: '8px',
  },
});

const allOptions = [
  'Active products summary',
  'Inactive products summary',
  '2014 edition summary',
  'SVAP Summary',
  'Surveillance Activity',
  'Surveillance (Basic)',
  'Surveillance Non-Conformities',
  'Direct Review Activity',
];

function ChplResourcesDownload() {
  const $analytics = getAngularService('$analytics');
  const API = getAngularService('API');
  const {
    getApiKey,
    getToken,
  } = getAngularService('authService');
  const { hasAnyRole } = useContext(UserContext);
  const [files, setFiles] = useState({});
  const [downloadOptions, setDownloadOptions] = useState(allOptions);
  const [selectedOption, setSelectedOption] = useState('Active products summary');
  const classes = useStyles();

  useEffect(() => {
    const data = {
      'Active products summary': { data: `${API}/download/active?api_key=${getApiKey()}&format=csv`, definition: `${API}/download/active?api_key=${getApiKey()}&format=csv&definition=true`, label: 'Active products' },
      'Inactive products summary': { data: `${API}/download/inactive?api_key=${getApiKey()}&format=csv`, definition: `${API}/download/inactive?api_key=${getApiKey()}&format=csv&definition=true`, label: 'Inactive products' },
      '2014 edition summary': { data: `${API}/download/2014?api_key=${getApiKey()}&format=csv`, definition: `${API}/download/2014?api_key=${getApiKey()}&format=csv&definition=true`, label: '2014 products' },
      'SVAP Summary': { data: `${API}/svap/download?api_key=${getApiKey()}`, definition: `${API}/svap/download?api_key=${getApiKey()}&definition=true`, label: 'SVAP Summary' },
      'Surveillance (Basic)': { data: `${API}/surveillance/download?api_key=${getApiKey()}&type=basic&authorization=Bearer%20${getToken()}`, definition: `${API}/surveillance/download?api_key=${getApiKey()}&type=basic&definition=true&authorization=Bearer%20${getToken()}`, label: 'Surveillance (Basic)' },
      'Surveillance Activity': { data: `${API}/surveillance/download?api_key=${getApiKey()}&type=all`, definition: `${API}/surveillance/download?api_key=${getApiKey()}&type=all&definition=true`, label: 'Surveillance' },
      'Surveillance Non-Conformities': { data: `${API}/surveillance/download?api_key=${getApiKey()}`, definition: `${API}/surveillance/download?api_key=${getApiKey()}&definition=true`, label: 'Surveillance Non-Conformities' },
      'Direct Review Activity': { data: `${API}/developers/direct-reviews/download?api_key=${getApiKey()}`, definition: `${API}/developers/direct-reviews/download?api_key=${getApiKey()}&definition=true`, label: 'Direct Review Activity' },
    };
    setFiles(data);
    setDownloadOptions(() => allOptions.filter((option) => {
      if (option === 'Surveillance (Basic)' && !hasAnyRole(['ROLE_ADMIN', 'ROLE_ONC'])) {
        return false;
      }
      return true;
    }));
  }, [API, getApiKey, getToken, hasAnyRole]);

  const downloadFile = (type) => {
    if (selectedOption) {
      $analytics.eventTrack(`Download CHPL${type === 'definition' ? ' Definition' : ''}`, { category: 'Download CHPL', label: files[selectedOption].label });
      window.open(files[selectedOption][type]);
    }
  };

  return (
    <>
      <div className={classes.pageHeader}>
        <Typography
          variant="h1"
        >
          Download the Latest Certified Health IT Product List
        </Typography>
      </div>
      <div className={classes.pageBody} id="main-content" tabIndex="-1">
        <div className={classes.content}>
          <div>
            <Typography
              variant="h4"
              component="h3"
              gutterBottom
            >
              <strong>Definitions & Guidelines</strong>
            </Typography>
            <Typography className={classes.listHeaders} gutterBottom variant="h6"><strong>Certified Health IT Products</strong></Typography>
            <ul className={classes.listSpacing}>
              <li>
                <Typography gutterBottom><strong>Certified Products Summary:</strong></Typography>
                {' '}
                Entire collection of a set of certified products, with only a subset of data elements included. Data elements included are: Certification edition, CHPL ID, ONC-ACB Certification ID, Certification Date, ONC-ACB Name, Developer Name, Product Name, Version, Practice Type (only for 2014 Edition products), Certification Status, Previous Certifying ACB, Total Number of Corrective Action Plans Over Time, Count of Currently Open Corrective Action Plans, and Certification Criteria to which that Certified Product attests.
                <ul>
                  <li>
                    The Active products summary file is updated nightly.
                  </li>
                  <li>
                    The Inactive products summary file is updated nightly.
                  </li>
                  <li>
                    The 2014 Edition Summary file is updated quarterly.
                  </li>
                </ul>
              </li>
              <li>
                <Typography gutterBottom><strong>Standards Version Advancement Process (SVAP) Summary:</strong></Typography>
                {' '}
                Entire collection of SVAP values that have been associated with a criterion for a certified product. Multiple rows for a single product will appear in the file for any products containing multiple SVAP values and/or SVAP values for multiple criteria. Updated nightly.
              </li>
            </ul>
            <Box pt={4} pb={4}>
              <Divider variant="fullWidth" />
            </Box>
            <Typography className={classes.listHeaders} gutterBottom variant="h6"><strong>Compliance Activities</strong></Typography>
            <ul className={classes.listSpacing}>
              <li>
                <Typography gutterBottom><strong>Surveillance Activity:</strong></Typography>
                {' '}
                Entire collection of surveillance activity reported to the CHPL.
              </li>
              { hasAnyRole(['ROLE_ADMIN', 'ROLE_ONC'])
                && (
                  <li>
                    <Typography gutterBottom><strong>Surveillance (Basic):</strong></Typography>
                    {' '}
                    Entire collection of surveillance activity reported to the CHPL, with only basic details about non-conformities. Includes statistics on timeframes related to discovered non-conformities.
                  </li>
                )}
              <li>
                <Typography gutterBottom><strong>Surveillance Non-Conformities:</strong></Typography>
                {' '}
                Collection of surveillance activities that resulted in a non-conformity. This is a subset of the data available in the above &quot;Surveillance Activity&quot; file.
              </li>
              <li>
                <Typography gutterBottom><strong>Direct Review Activity:</strong></Typography>
                {' '}
                Entire collection of Direct Review activity reported to the CHPL.
              </li>
            </ul>
          </div>
          <Card elevation={4}>
            <CardHeader title="Select A File To Download" />
            <CardContent>
              <Box display="flex" flexDirection="column" gridGap={16}>
                <Typography> To download a list of certified health IT products or compliance activities listed on the CHPL, please select from one of the categories below in the dropdown menu, and then click the Data File or Definition File button as needed.</Typography>
                <div className={classes.fullWidth}>
                  <ChplTextField
                    select
                    id="download-select"
                    name="downloadSelect"
                    label="Select a collection to download"
                    value={selectedOption}
                    onChange={(event) => setSelectedOption(event.target.value)}
                  >
                    { downloadOptions.map((item) => (
                      <MenuItem value={item} key={item}>{item}</MenuItem>
                    ))}
                  </ChplTextField>
                </div>
              </Box>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                id="download-chpl-data-button"
                onClick={() => downloadFile('data')}
              >
                Data File
                {' '}
                <GetAppIcon className={classes.iconSpacing} />
              </Button>
              <Button
                fullWidth
                color="primary"
                variant="text"
                id="download-chpl-definition-button"
                disabled={files[selectedOption]?.definition === ''}
                onClick={() => downloadFile('definition')}
              >
                Definition File
                {' '}
                <CodeIcon className={classes.iconSpacing} />
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </>
  );
}

export default ChplResourcesDownload;
