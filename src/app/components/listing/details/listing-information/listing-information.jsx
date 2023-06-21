import React, { useContext } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';

import { ChplLink } from 'components/util';
import { getDisplayDateFormat } from 'services/date-util';
import { UserContext } from 'shared/contexts';
import { listing as listingType } from 'shared/prop-types/listing';

function ChplListingInformation(props) {
  const { listing } = props;
  const { hasAnyRole, user } = useContext(UserContext);

  const canViewRwtDates = () => {
    if (hasAnyRole(['ROLE_ADMIN', 'ROLE_ONC'])) { return true; }
    if (hasAnyRole(['ROLE_ACB']) && user.organizations.some((o) => o.id === listing.certifyingBody.id)) { return true; }
    if (hasAnyRole(['ROLE_DEVELOPER']) && user.organizations.some((o) => o.id === listing.developer.id)) { return true; }
    return false;
  };

  return (
    <>
      <Box gridGap={16} display="flex" flexDirection="column">
        <Box gridGap={16} display="flex" flexDirection="column">
          <Box gridGap={8} display="flex" flexDirection="row" flexWrap="wrap">
            <Box width="48%">
              <Typography variant="subtitle1">CHPL Product Number:</Typography>
              <Typography gutterBottom>{listing.chplProductNumber}</Typography>
            </Box>
            <Box width="48%">
              {listing.acbCertificationId
                && (
                  <>
                    <Typography variant="subtitle1">ONC-ACB Certification ID:</Typography>
                    <Typography gutterBottom>{listing.acbCertificationId}</Typography>
                  </>
                )}
            </Box>
            <Box width="48%">
              {listing.chplProductNumberHistory.length > 0
                && (
                  <>
                    <Typography variant="subtitle1">Previous CHPL Product Numbers:</Typography>
                    <List>
                      {listing.chplProductNumberHistory.map((prev) => (
                        <ListItem key={prev}>
                          {prev}
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
            </Box>
            <Box width="48%">
              <Typography variant="subtitle1">Certification Date:</Typography>
              <Typography gutterBottom>{getDisplayDateFormat(listing.certificationDate)}</Typography>
              {listing.product.ownerHistory?.length > 0
                && (
                  <>
                    <Typography variant="subtitle1"> Previous Developer:</Typography>
                    <List>
                      {listing.product.ownerHistory.map((prev) => (
                        <ListItem key={prev.developer.id}>
                          {prev.developer.name}
                          <br />
                          Transfer Date:
                          {' '}
                          {getDisplayDateFormat(prev.transferDay)}
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
            </Box>
            <Box width="48%">
              <Typography variant="subtitle1">Version:</Typography>
              <Typography gutterBottom>{listing.version.version}</Typography>
            </Box>
            <Box width="48%">
              <Typography variant="subtitle1">Certification Edition:</Typography>
              <Typography gutterBottom>{`${listing.certificationEdition.name}${listing.curesUpdate ? ' Cures Update' : ''}`}</Typography>
            </Box>
            <Box width="48%">
              <Typography variant="subtitle1">Certification Status:</Typography>
              <Typography gutterBottom>{listing.currentStatus.status.name}</Typography>
              {listing.practiceType.name
                && (
                  <>
                    <Typography variant="subtitle1">Practice Type:</Typography>
                    <Typography gutterBottom>{listing.practiceType.name}</Typography>
                  </>
                )}
              {listing.classificationType.name
                && (
                  <>
                    <Typography variant="subtitle1">Classification Type:</Typography>
                    <Typography gutterBottom>{listing.classificationType.name}</Typography>
                  </>
                )}
            </Box>
            <Box width="48%">
              <Typography variant="subtitle1">ONC-Authorized Certification Body:</Typography>
              <Typography gutterBottom>{listing.certifyingBody.name}</Typography>
            </Box>
            <Box width="48%">
              <Typography variant="subtitle1">ONC-Authorized Testing Laboratory:</Typography>
              {listing.testingLabs.map((atl) => (
                <Typography gutterBottom key={atl.id}>{atl.testingLabName}</Typography>
              ))}
              {listing.productAdditionalSoftware
                && (
                  <>
                    <Typography variant="subtitle1">Relied Upon Software:</Typography>
                    <Typography gutterBottom>{listing.productAdditionalSoftware}</Typography>
                  </>
                )}
              {listing.svapNoticeUrl
                && (
                  <>
                    <Typography variant="subtitle1">Standards Version Advancement Process Notice:</Typography>
                    <ChplLink
                      href={listing.svapNoticeUrl}
                      analytics={{ event: 'SVAP Notice', category: 'Listing Details', label: listing.svapNoticeUrl }}
                    />
                  </>
                )}
            </Box>
            <Box width="48%">
              <Typography variant="subtitle1">Transparency Disclosure:</Typography>
              {listing.mandatoryDisclosures
                ? (
                  <ChplLink
                    href={listing.mandatoryDisclosures}
                    analytics={{ event: 'Transparency Disclosure', category: 'Listing Details', label: listing.mandatoryDisclosures }}
                  />
                ) : (
                  <Typography gutterBottom>No report on File</Typography>
                )}
            </Box>
          </Box>
          { /* chpl-listing-history-bridge */}
          { /* edit */}
          { /* manage surveillance */}
          { /* action button */}
          <Card>
            <CardHeader title="Developer" />
            <CardContent>
              <Box gridGap={8} display="flex" flexDirection="row" flexWrap="wrap">
                <Box width="48%">
                  <Typography variant="subtitle1">Chpl Developer Page</Typography>
                  <ChplLink
                    href={`#/organizations/developers/${listing.developer.id}`}
                    text={listing.developer.name}
                    analytics={{ event: 'Go to Developer Page', category: 'Listing Details', label: listing.developer.name }}
                    external={false}
                    router={{ sref: 'organizations.developers.developer', options: { id: listing.developer.id } }}
                  />
                </Box>
                {listing.developer.status.status !== 'Active' // consider icons?
                  && (
                    <>
                      <Box width="48%">

                        <Typography variant="subtitle1">Developer Status:</Typography>
                        <Typography gutterBottom>{listing.developer.status.status}</Typography>
                      </Box>

                    </>
                  )}

                {listing.developer.website
                  && (
                    <>
                      <Box width="48%">
                        <Typography variant="subtitle1">Developer Website:</Typography>
                        <ChplLink
                          href={listing.developer.website}
                          analytics={{ event: 'Go to Developer Website', category: 'Listing Details', label: listing.developer.name }}
                        />
                      </Box>
                    </>
                  )}
                <Box width="48%">
                  <Typography variant="subtitle1">Self-Developer:</Typography>
                  <Typography gutterBottom>{listing.developer.selfDeveloper ? 'Yes' : 'No'}</Typography>
                </Box>
                {listing.developer.address
                  && (
                    <Box width="48%">
                      <Typography variant="body1" gutterBottom>
                        <strong>Address</strong>
                        <br />
                        <span className="sr-only">Line 1: </span>
                        {listing.developer.address.line1}
                        {listing.developer.address.line2
                          && (
                            <>
                              ,
                              {' '}
                              <span className="sr-only">Line 2: </span>
                              {listing.developer.address.line2}
                            </>
                          )}
                        <br />
                        <span className="sr-only">City: </span>
                        {listing.developer.address.city}
                        ,
                        {' '}
                        <span className="sr-only">State: </span>
                        {listing.developer.address.state}
                        {' '}
                        <span className="sr-only">Zipcode: </span>
                        {listing.developer.address.zipcode}
                        ,
                        {' '}
                        <span className="sr-only">Country: </span>
                        {listing.developer.address.country}
                      </Typography>
                    </Box>
                  )}
                {listing.product.contact
                  && (
                    <Typography variant="body1" gutterBottom>
                      <strong>Contact</strong>
                      <br />
                      <span className="sr-only">Full name: </span>
                      {listing.product.contact.fullName}
                      {listing.product.contact.title
                        && (
                          <>
                            ,
                            {' '}
                            <span className="sr-only">Title: </span>
                            {listing.product.contact.title}
                          </>
                        )}
                      <br />
                      <span className="sr-only">Phone: </span>
                      {listing.product.contact.phoneNumber}
                      <br />
                      <span className="sr-only">Email: </span>
                      {listing.product.contact.email}
                    </Typography>
                  )}
                {!listing.product.contact && listing.developer.contact
                  && (
                    <Typography variant="body1" gutterBottom>
                      <strong>Contact</strong>
                      <br />
                      <span className="sr-only">Full name: </span>
                      {listing.developer.contact.fullName}
                      {listing.developer.contact.title
                        && (
                          <>
                            ,
                            {' '}
                            <span className="sr-only">Title: </span>
                            {listing.developer.contact.title}
                          </>
                        )}
                      <br />
                      <span className="sr-only">Phone: </span>
                      {listing.developer.contact.phoneNumber}
                      <br />
                      <span className="sr-only">Email: </span>
                      {listing.developer.contact.email}
                    </Typography>
                  )}
              </Box>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Conditions and Maintenance of Certification" />
            <CardContent>
              <Box gridGap={8} display="flex" flexDirection="row" flexWrap="wrap">
                <Box width="48%">
                  <Typography variant="subtitle1">Attestations:</Typography>
                  <ChplLink
                    href={`#/organizations/developers/${listing.developer.id}`}
                    text={listing.developer.name}
                    analytics={{ event: 'Go to Developer Page', category: 'Listing Details', label: listing.developer.name }}
                    external={false}
                    router={{ sref: 'organizations.developers.developer', options: { id: listing.developer.id } }}
                  />
                </Box>
                {(listing.rwtPlansUrl || listing.rwtPlansCheckDate || listing.rwtResultsUrl || listing.rwtResultsCheckDate)
                  && (
                    <>
                      <Box width="48%">
                        <Typography variant="subtitle1" gutterBottom>Real World Testing</Typography>
                        {listing.rwtPlansUrl
                          && (
                            <>
                              <Typography variant="subtitle2">Plans:</Typography>
                              <ChplLink
                                href={listing.rwtPlansUrl}
                                analytics={{ event: 'Go to RWT Plans URL', category: 'Listing Details', label: listing.rwtPlansUrl }}
                              />
                            </>
                          )}
                        {listing.rwtPlansCheckDate && canViewRwtDates()
                          && (
                            <>
                              <Typography variant="subtitle2">Last ONC-ACB RWT Plans Completeness Check:</Typography>
                              <Typography gutterBottom>{getDisplayDateFormat(listing.rwtPlansCheckDate)}</Typography>
                            </>
                          )}
                        {listing.rwtResultsUrl
                          && (
                            <>
                              <Typography variant="subtitle2">Results:</Typography>
                              <ChplLink
                                href={listing.rwtResultsUrl}
                                analytics={{ event: 'Go to RWT Results URL', category: 'Listing Details', label: listing.rwtResultsUrl }}
                              />
                            </>
                          )}
                        {listing.rwtResultsCheckDate && canViewRwtDates()
                          && (
                            <>
                              <Typography variant="subtitle2">Last ONC-ACB RWT Results Completeness Check:</Typography>
                              <Typography gutterBottom>{getDisplayDateFormat(listing.rwtResultsCheckDate)}</Typography>
                            </>
                          )}
                      </Box>
                    </>
                  )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
}

export default ChplListingInformation;

ChplListingInformation.propTypes = {
  listing: listingType.isRequired,
};
