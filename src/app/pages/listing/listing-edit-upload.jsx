import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Fade,
  FormControlLabel,
  List,
  Switch,
  Typography,
  makeStyles,
} from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { number, oneOfType, string } from 'prop-types';
import ChplUploadListing from './components/upload-listing';

import { useFetchListing } from 'api/listing';
import { ChplActionBar } from 'components/action-bar';
import ChplAdditionalInformation from 'components/listing/details/additional-information/additional-information';
import ChplCompliance from 'components/listing/details/compliance/compliance';
import ChplCqms from 'components/listing/details/cqms/cqms';
import ChplCriteria from 'components/listing/details/criteria/criteria';
import ChplG1G2 from 'components/listing/details/g1g2/g1g2';
import ChplListingInformation from 'components/listing/details/listing-information/listing-information';
import ChplSed from 'components/listing/details/sed/sed';
import { getAngularService } from 'services/angular-react-helper';
import { compareListing } from 'pages/listing/history/listings.service';
import { ListingContext } from 'shared/contexts';
import { palette, theme, utilStyles } from 'themes';

const useStyles = makeStyles({
  ...utilStyles,
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '16px',
    padding: '32px 0',
    backgroundColor: palette.background,
    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 350px',
      alignItems: 'start',
    },
  },
  differenceCallout: {
    background: palette.warningLight,
    border: `.5px solid ${palette.warning}`,
    borderRadius: '8px',
    padding: '16px 8px',
  },
  differenceContainer: {
    position: 'sticky',
    top: '116px',
  },
  pageHeader: {
    padding: '32px 0',
    backgroundColor: palette.white,
  },
  placeholderContainer: {
    background: palette.white,
    border: `.5px solid ${palette.divider}`,
    borderRadius: '8px',
    padding: '16px 8px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    padding: '16px',
    backgroundColor: palette.secondary,
    borderBottom: `.5px solid ${palette.divider}`,
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
  sectionHeaderText: {
    fontWeight: '600 !important',
    fontSize: '1.1em!important',
  },
});

function ChplListingEditUploadPage({ id }) {
  const $state = getAngularService('$state');
  const [diff, setDiff] = useState([]);
  const [errors, setErrors] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [listing, setListing] = useState(undefined);
  const [newListing, setNewListing] = useState(undefined);
  const [seeAllCqms, setSeeAllCqms] = useState(false);
  const [seeAllCriteria, setSeeAllCriteria] = useState(false);
  const [warnings, setWarnings] = useState([]);
  const { data, isLoading, isSuccess } = useFetchListing({ id, fetched });
  const classes = useStyles();

  useEffect(() => {
    if (isLoading || !isSuccess) {
      return;
    }
    setFetched(true);
    setListing(data);
  }, [data, isLoading, isSuccess]);

  useEffect(() => {
    if (!newListing) { return; }
    setDiff(compareListing(listing, newListing));
  }, [listing, newListing]);

  useEffect(() => {
    if (!newListing) { return; }
    setErrors((prev) => [
      ...prev,
      ...newListing.businessErrorMessages,
      ...newListing.dataErrorMessages,
    ]);
    setWarnings(newListing.warningMessages);
  }, [newListing]);

  const handleDispatch = (action) => {
    switch (action) {
      case 'cancel':
        $state.go('^');
        break;
      case 'save':
        setIsProcessing(true);
        break;
      default:
        console.log({ action });
        break;
    }
  };

  const toggleSeeAllCriteria = () => {
    setSeeAllCriteria(!seeAllCriteria);
  };

  const toggleSeeAllCqms = () => {
    setSeeAllCqms(!seeAllCqms);
  };

  const listingState = {
    listing,
  };

  const newListingState = {
    listing: newListing,
    setListing: setNewListing,
  };

  if (isLoading || !isSuccess || !listing) {
    return <CircularProgress />;
  }

  return (
    <Box bgcolor={palette.background}>
      <div className={classes.pageHeader}>
        <Container maxWidth="lg">
          <Typography
            variant="h1"
          >
            Edit
            {' '}
            {listing.product.name}
          </Typography>
        </Container>
      </div>
      <Container maxWidth="lg" id="main-content" tabIndex="-1">
        <Box mt={4}>
          <ListingContext.Provider value={newListingState}>
            <ChplUploadListing
              id={listing.id}
              setErrors={setErrors}
              setWarnings={setWarnings}
            />
          </ListingContext.Provider>
        </Box>
        <div className={classes.container}>
          <div>
            <Typography gutterBottom component={"h3"} style={{ fontWeight: '600' }} variant='h4'>Current Listing</Typography>
            <Box display={'flex'} flexDirection={'column'} gridGap={'32px'}>
              <div>
                <ListingContext.Provider value={listingState}>
                  <Card>
                    <Box className={classes.sectionHeader}>
                      <Typography className={classes.sectionHeaderText} variant="h5">Listing Information</Typography>
                    </Box>
                    <CardContent>
                      <ChplListingInformation
                        listing={listing}
                      />
                    </CardContent>
                  </Card>
                </ListingContext.Provider>
              </div>
              <div>
                <ListingContext.Provider value={listingState}>
                  <Card>
                    <Box className={classes.sectionHeader}>
                      <Typography className={classes.sectionHeaderText} variant="h5">Certification Criteria</Typography>
                      <div>
                        <FormControlLabel
                          control={(
                            <Switch
                              id="see-all-criteria"
                              name="seeAllCriteria"
                              checked={seeAllCriteria}
                              color="primary"
                              onChange={toggleSeeAllCriteria}
                            />
                          )}
                          label="See all Certification Criteria"
                        />
                        (
                        {listing.certificationResults.filter((cr) => cr.success).length}
                        {' '}
                        found)
                      </div>
                    </Box>
                    <CardContent>
                      <ChplCriteria
                        listing={listing}
                        viewAll={seeAllCriteria}
                      />
                    </CardContent>
                  </Card>
                </ListingContext.Provider>
              </div>
              <div>
                <ListingContext.Provider value={listingState}>
                  <Card>
                    <Box className={classes.sectionHeader}>
                      <Typography className={classes.sectionHeaderText} variant="h5">Clinical Quality Measures</Typography>
                      <div>
                        <FormControlLabel
                          control={(
                            <Switch
                              id="see-all-cqms"
                              name="seeAllCqms"
                              color="primary"
                              checked={seeAllCqms}
                              onChange={toggleSeeAllCqms}
                            />
                          )}
                          label="See all CQMs"
                        />
                        (
                        {listing.cqmResults.filter((cqm) => cqm.success).length}
                        {' '}
                        found)
                      </div>
                    </Box>
                    <CardContent>
                      <ChplCqms
                        cqms={listing.cqmResults}
                        edition={listing.edition}
                        viewAll={seeAllCqms}
                      />
                    </CardContent>
                  </Card>
                </ListingContext.Provider>
              </div>
              <div>
                <ListingContext.Provider value={listingState}>
                  <Card>
                    <Box className={classes.sectionHeader}>
                      <Typography className={classes.sectionHeaderText} variant="h5">Safety Enhanced Design (SED)</Typography>
                    </Box>
                    <CardContent>
                      <ChplSed
                        listing={listing}
                      />
                    </CardContent>
                  </Card>
                </ListingContext.Provider>
              </div>
              <div>
                <ListingContext.Provider value={listingState}>
                  <Card>
                    <Box className={classes.sectionHeader}>
                      <Typography className={classes.sectionHeaderText} variant="h5">G1/G2 Measures</Typography>
                    </Box>
                    <CardContent>
                      <ChplG1G2
                        measures={listing.measures}
                      />
                    </CardContent>
                  </Card>
                </ListingContext.Provider>
              </div>
              <div>
                <ListingContext.Provider value={listingState}>
                  <Card>
                    <Box className={classes.sectionHeader}>
                      <Typography className={classes.sectionHeaderText} variant="h5">Compliance Activities</Typography>
                    </Box>
                    <CardContent>
                      <ChplCompliance
                        directReviews={listing.directReviews}
                        directReviewsAvailable={listing.directReviewsAvailable}
                        surveillance={listing.surveillance}
                      />
                    </CardContent>
                  </Card>
                </ListingContext.Provider>
              </div>
              <div>
                <ListingContext.Provider value={listingState}>
                  <Card>
                    <Box className={classes.sectionHeader}>
                      <Typography className={classes.sectionHeaderText} variant="h5">Additional Information</Typography>
                    </Box>
                    <CardContent>
                      <ChplAdditionalInformation
                        listing={listing}
                      />
                    </CardContent>
                  </Card>
                </ListingContext.Provider>
              </div>
            </Box>
          </div>
          <div>
            <div>
              <Typography gutterBottom component={"h3"} style={{ fontWeight: '600' }} variant='h4'>Updated Listing</Typography>
              <div>
                {!newListing ? (
                  <Box display={'flex'} flexDirection={'row'} gridGap={8} className={classes.placeholderContainer}>
                    <HelpOutlineIcon fontSize="large" color="primary" />
                    <Typography>Upload a file above to display your new listing.</Typography>
                  </Box>
                ) : (
                  <>
                    {newListing && (
                      <Fade style={{ transitionDelay: newListing ? '1s' : '0ms' }} in={!!newListing}>
                        <Box display={'flex'} flexDirection={'column'} gridGap={'32px'}>
                          <ListingContext.Provider value={newListingState}>
                            <Card>
                              <Box className={classes.sectionHeader}>
                                <Typography className={classes.sectionHeaderText} variant="h5">Listing Information</Typography>
                              </Box>
                              <CardContent>
                                <ChplListingInformation listing={newListing} />
                              </CardContent>
                            </Card>
                          </ListingContext.Provider>

                          <ListingContext.Provider value={newListingState}>
                            <Card>
                              <Box className={classes.sectionHeader}>
                                <Typography className={classes.sectionHeaderText} variant="h5">Certification Criteria</Typography>
                                <div>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        id="see-all-criteria"
                                        name="seeAllCriteria"
                                        checked={seeAllCriteria}
                                        color="primary"
                                        onChange={toggleSeeAllCriteria}
                                      />
                                    }
                                    label="See all Certification Criteria"
                                  />
                                  ({newListing.certificationResults.filter((cr) => cr.success).length} found)
                                </div>
                              </Box>
                              <CardContent>
                                <ChplCriteria listing={newListing} viewAll={seeAllCriteria} />
                              </CardContent>
                            </Card>
                          </ListingContext.Provider>

                          <ListingContext.Provider value={newListingState}>
                            <Card>
                              <Box className={classes.sectionHeader}>
                                <Typography className={classes.sectionHeaderText} variant="h5">Clinical Quality Measures</Typography>
                                <div>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        id="see-all-cqms"
                                        name="seeAllCqms"
                                        color="primary"
                                        checked={seeAllCqms}
                                        onChange={toggleSeeAllCqms}
                                      />
                                    }
                                    label="See all CQMs"
                                  />
                                  ({newListing.cqmResults.filter((cqm) => cqm.success).length} found)
                                </div>
                              </Box>
                              <CardContent>
                                <ChplCqms cqms={newListing.cqmResults} edition={newListing.edition} viewAll={seeAllCqms} />
                              </CardContent>
                            </Card>
                          </ListingContext.Provider>

                          <ListingContext.Provider value={newListingState}>
                            <Card>
                              <Box className={classes.sectionHeader}>
                                <Typography className={classes.sectionHeaderText} variant="h5">Safety Enhanced Design (SED)</Typography>
                              </Box>
                              <CardContent>
                                <ChplSed listing={newListing} />
                              </CardContent>
                            </Card>
                          </ListingContext.Provider>

                          <ListingContext.Provider value={newListingState}>
                            <Card>
                              <Box className={classes.sectionHeader}>
                                <Typography className={classes.sectionHeaderText} variant="h5">G1/G2 Measures</Typography>
                              </Box>
                              <CardContent>
                                <ChplG1G2 measures={newListing.measures} />
                              </CardContent>
                            </Card>
                          </ListingContext.Provider>

                          <ListingContext.Provider value={newListingState}>
                            <Card>
                              <Box className={classes.sectionHeader}>
                                <Typography className={classes.sectionHeaderText} variant="h5">Compliance Activities</Typography>
                              </Box>
                              <CardContent>
                                <ChplCompliance directReviews={newListing.directReviews} directReviewsAvailable={newListing.directReviewsAvailable} surveillance={newListing.surveillance} />
                              </CardContent>
                            </Card>
                          </ListingContext.Provider>

                          <ListingContext.Provider value={newListingState}>
                            <Card>
                              <Box className={classes.sectionHeader}>
                                <Typography className={classes.sectionHeaderText} variant="h5">Additional Information</Typography>
                              </Box>
                              <CardContent>
                                <ChplAdditionalInformation listing={newListing} />
                              </CardContent>
                            </Card>
                          </ListingContext.Provider>
                        </Box>
                      </Fade>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={classes.differenceContainer}>
            <Typography gutterBottom component={"h2"} style={{ fontWeight: '600' }} variant="h4">Difference(s)</Typography>
            {diff.length === 0 ? (
              <Box className={classes.placeholderContainer}><Typography>Waiting for upload to show results...</Typography></Box>

            ) : (
              <Fade style={{ transitionDelay: newListing ? '1.5s' : '0ms' }} in={!!diff.length > 0}>
                <Box className={classes.differenceCallout}>
                  <List className="list-unstyled">
                    {diff.map((change) => (
                      <li key={change} dangerouslySetInnerHTML={{ __html: `${change}` }} />
                    ))}
                  </List>
                </Box>
              </Fade>
            )}
          </div>
        </div>
      </Container>
      <ChplActionBar
        dispatch={handleDispatch}
        errors={errors}
        warnings={warnings}
        isDisabled
        isProcessing={isProcessing}
      />
    </Box>
  );
}

export default ChplListingEditUploadPage;

ChplListingEditUploadPage.propTypes = {
  id: oneOfType([number, string]).isRequired,
};
