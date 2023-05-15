import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Typography,
  makeStyles,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { arrayOf } from 'prop-types';

import { ChplTooltip } from 'components/util';
import { getDisplayDateFormat } from 'services/date-util';
import { directReview as directReviewPropType } from 'shared/prop-types';
import { palette, utilStyles } from 'themes';

const useStyles = makeStyles({
  ...utilStyles,
  infoIcon: {
    color: `${palette.primary}`,
  },
  root: {
    width: '100%',
    padding: '0 8px !important',
  },
  subCard: {
    backgroundColor: `${palette.white}`,
    borderBottom: `.5px solid ${palette.divider}`,
  },
  directReviews: {
    borderRadius: '4px',
    display: 'grid',
    borderColor: `${palette.divider}`,
    borderWidth: '.5px',
    borderStyle: 'solid',
    padding: '0px',
    backgroundColor: `${palette.white}`,
  },
  directReviewsSummary: {
    backgroundColor: `${palette.secondary}!important`,
    borderRadius: '4px',
    borderBottom: `.5px solid ${palette.divider}`,
    width: '100%',
    padding: '0 8px!important',
  },
  directReviewSummary: {
    backgroundColor: `${palette.white}!important`,
    borderRadius: '4px',
    borderBottom: `.5px solid ${palette.divider}`,
    width: '100%',
    padding: '0 8px!important',
  },
  '& span.MuiTypography-root.MuiCardHeader-title.MuiTypography-h6.MuiTypography-displayBlock': {
    fontWeight: '300',
  },
});

const getDataDisplay = (title, value, tooltip) => (
  <Box width="48%" gridGap="8px" alignItems="center" display="flex" justifyContent="space-between">
    <Box display="flex" flexDirection="column">
      <Typography variant="subtitle2">
        { title }
      </Typography>
      { value }
    </Box>
    <Box>
      <ChplTooltip
        title={tooltip}
      >
        <InfoIcon color="primary" />
      </ChplTooltip>
    </Box>
  </Box>
);

const getFriendlyValues = (nc) => ({
  ...nc,
  friendlyCapApprovalDate: getDisplayDateFormat(nc.capApprovalDate, nc.capApprovalDate),
  friendlyCapMustCompleteDate: getDisplayDateFormat(nc.capMustCompleteDate, nc.capMustCompleteDate),
  friendlyCapEndDate: getDisplayDateFormat(nc.capEndDate, nc.capEndDate),
});

const sortDirectReviews = (a, b) => {
  if (a.endDate && b.endDate) {
    return a.endDate < b.endDate ? 1 : -1;
  }
  if (!a.endDate && !b.endDate) {
    return a.startDate < b.startDate ? 1 : -1;
  }
  return a.endDate ? 1 : -1;
};

const sortNonconformities = (a, b) => {
  if (a.nonConformityStatus !== b.nonConformityStatus) {
    return a.nonConformityStatus === 'Open' ? -1 : 1;
  }
  return a.created - b.created;
};

function ChplDirectReviews({ directReviews: initialDirectReviews }) {
  const [directReviews, setDirectReviews] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setDirectReviews(initialDirectReviews.map((dr) => {
      const open = dr.nonConformities
        .filter((nc) => nc.nonConformityStatus === 'Open')
        .length;
      const total = dr.nonConformities.length;
      let { ncSummary } = dr;
      if (open > 0) {
        ncSummary = `${open} open / ${total}`;
      } else if (total > 0) {
        ncSummary = `${total} closed`;
      } else {
        ncSummary = 'no';
      }
      ncSummary += ` non-conformit${total !== 1 ? 'ies' : 'y'} found`;
      const startDate = dr.nonConformities
        .filter((nc) => nc.capApprovalDate)
        .sort((a, b) => (a.capApprovalDate < b.capApprovalDate ? -1 : 1))[0]?.capApprovalDate;
      const endDates = dr.nonConformities
        .filter((nc) => nc.capApprovalDate)
        .filter((nc) => nc.capEndDate)
        .sort((a, b) => (a.capEndDate > b.capEndDate ? -1 : 1));
      const endDate = open === 0 && endDates[0]?.capEndDate;
      return {
        ...dr,
        startDate,
        endDate,
        ncSummary,
        isClosed: !!endDate,
        nonConformities: dr.nonConformities
          .map(getFriendlyValues)
          .sort(sortNonconformities),
      };
    }).sort(sortDirectReviews));
  }, [initialDirectReviews]);

  return (
    <Accordion className={classes.directReviews}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className={classes.directReviewsSummary}
        color="secondary"
      >
        <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%">
          <Typography>
            Direct Review Activities
          </Typography>
          <Typography variant="body2">
            (
            { directReviews.length }
            {' '}
            found)
          </Typography>
        </Box>
      </AccordionSummary>
      <CardContent>
        <Typography gutterBottom>
          Direct Review information is displayed here if a Direct Review has been opened by ONC that either affects this listing directly or applies to the developer of this listing
        </Typography>
        { directReviews.length === 0
          && (
            <Typography>
              No Direct Reviews have been conducted
            </Typography>
          )}
        { directReviews.map((dr) => (
          <Accordion className={classes.directReviews} key={dr.created}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={classes.directReviewSummary}
              color="secondary"
            >
              <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%">
                <Typography>
                  { dr.isClosed ? 'Closed' : 'Open' }
                  {' '}
                  Direct Review
                </Typography>
                <Typography>
                  { dr.ncSummary }
                </Typography>
              </Box>
            </AccordionSummary>
            <CardContent>
              { (!dr.nonConformities || dr.nonConformities.length === 0)
                && (
                  <Typography>
                    Has not been determined
                  </Typography>
                )}
              { dr.nonConformities.map((nc) => (
                <Card key={nc.created}>
                  <CardHeader
                    titleTypographyProps={{ variant: 'h6' }}
                    className={classes.subCard}
                    title={nc.nonConformityType ? nc.nonConformityType : 'Has not been determined'}
                  >
                    <ChplTooltip
                      title="Type of non-conformity found during review"
                    >
                      <InfoIcon color="primary" />
                    </ChplTooltip>
                  </CardHeader>
                  <CardContent>
                    <Box display="flex" gridGap="8px" flexWrap="wrap" flexDirection="row" justifyContent="space-between">
                      { getDataDisplay('Developer Associated Listings',
                        <>
                          {(!nc.developerAssociatedListings || nc.developerAssociatedListings.length === 0)
                           && (
                             <Typography>
                               None
                             </Typography>
                           )}
                          { nc.developerAssociatedListings?.length > 0
                            && (
                              <List>
                                { nc.developerAssociatedListings.map((dal) => (
                                  <ListItem key={dal.id}>
                                    <a href={`#/listing/${dal.id}?panel=directReviews`}>{ dal.chplProductNumber }</a>
                                  </ListItem>
                                ))}
                              </List>
                            )}
                        </>,
                        'A listing of other certified products associated with the non-conformity, as applicable') }
                      { getDataDisplay('Corrective Action Plan Approval Date', <Typography>{ nc.friendlyCapApprovalDate }</Typography>, 'The date that ONC approved the corrective action plan proposed by the developer') }
                      { getDataDisplay('Date Corrective Action Must Be Completed', <Typography>{ nc.friendlyCapMustCompleteDate }</Typography>, 'The date that the corrective action must be completed in order to avoid termination of the certified product’s certification status and/or a certification ban of the developer, as applicable') }
                      { getDataDisplay('Date Corrective Action Was Completed', <Typography>{ nc.friendlyCapEndDate }</Typography>, 'The date the corrective action was completed') }
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Accordion>
        ))}
      </CardContent>
    </Accordion>
  );
}

export default ChplDirectReviews;

ChplDirectReviews.propTypes = {
  directReviews: arrayOf(directReviewPropType).isRequired,
};
