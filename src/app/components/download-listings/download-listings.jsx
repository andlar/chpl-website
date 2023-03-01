import React, { useEffect, useState } from 'react';
import {
  Button,
  Divider,
  ButtonGroup,
  Menu,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import { arrayOf, shape, string } from 'prop-types';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckIcon from '@material-ui/icons/Check';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ExportToCsv } from 'export-to-csv';

import { ChplTooltip } from '../util';

import { listing as listingPropType } from 'shared/prop-types';
import { getAngularService } from 'services/angular-react-helper';
import { sortCqms } from 'services/cqms.service';
import { sortCriteria } from 'services/criteria.service';
import { palette } from 'themes';

const useStyles = makeStyles({
  noMargin: {
    margin: '0',
  },
});

const csvOptions = {
  filename: 'listings',
  showLabels: true,
};

const allHeaders = [
  { headerName: 'CHPL ID', objectKey: 'chplProductNumber' },
  { headerName: 'Certification Edition', objectKey: 'fullEdition' },
  { headerName: 'Developer', objectKey: 'developerName', group: 'productData' },
  { headerName: 'Product', objectKey: 'productName', group: 'productData' },
  { headerName: 'Version', objectKey: 'versionName', group: 'productData' },
  { headerName: 'Certification Date', objectKey: 'certificationDate' },
  { headerName: 'Certification Status', objectKey: 'certificationStatusName' },
  { headerName: 'Details', objectKey: 'detailsLink' },
  { headerName: 'API Documentation - 170.315 (g)(7)', objectKey: 'apiDocumentation56', group: 'apiDocumentation' },
  { headerName: 'API Documentation - 170.315 (g)(9) (Cures Update)', objectKey: 'apiDocumentation181', group: 'apiDocumentation' },
  { headerName: 'API Documentation - 170.315 (g)(10) (Cures Update)', objectKey: 'apiDocumentation182', group: 'apiDocumentation' },
  { headerName: 'Service Base URL List', objectKey: 'serviceBaseUrlList', group: 'apiDocumentation' },
  { headerName: 'Mandatory Disclosures URL', objectKey: 'mandatoryDisclosures', group: 'apiDocumentation' },
  { headerName: 'Certification Criteria', objectKey: 'criteria' },
  { headerName: 'Clinical Quality Measures', objectKey: 'cqms' },
  { headerName: 'Total Surveillance', objectKey: 'surveillanceCount', group: 'compliance' },
  { headerName: 'Open Surveillance Non-conformities', objectKey: 'openSurveillanceNonConformityCount', group: 'compliance' },
  { headerName: 'Closed Surveillance Non-conformities', objectKey: 'closedSurveillanceNonConformityCount', group: 'compliance' },
  { headerName: 'Total Direct Reviews', objectKey: 'directReviewCount', group: 'compliance' },
  { headerName: 'Open Direct Review Non-conformities', objectKey: 'openDirectReviewNonConformityCount', group: 'compliance' },
  { headerName: 'Closed Direct Review Non-conformities', objectKey: 'closedDirectReviewNonConformityCount', group: 'compliance' },
  { headerName: 'Decertification Date', objectKey: 'decertificationDate' },
  { headerName: 'ONC-ACB', objectKey: 'acb' },
  { headerName: 'Practice Type', objectKey: 'practiceTypeName' },
  { headerName: 'Real World Testing Plans URL', objectKey: 'rwtPlansUrl', group: 'rwt' },
  { headerName: 'Real World Testing Results URL', objectKey: 'rwtResultsUrl', group: 'rwt' },
];

/* eslint object-curly-newline: ["error", { "minProperties": 5, "consistent": true }] */
const allCategories = [
  { name: 'CHPL ID', key: 'chplProductNumber', selected: true },
  { name: 'Certification Edition', key: 'fullEdition', selected: true },
  { name: 'Product data', key: 'productData', selected: true },
  { name: 'Certification Date', key: 'certificationDate', selected: true },
  { name: 'Certification Status', key: 'certificationStatusName', selected: true },
  { name: 'Details', key: 'detailsLink', selected: true, hasDivider: true },
  { name: 'API Documentation', key: 'apiDocumentation' },
  { name: 'Certification Criteria', key: 'criteria' },
  { name: 'Clinical Quality Measures', key: 'cqms' },
  { name: 'Compliance', key: 'compliance' },
  { name: 'Decertification Date', key: 'decertificationDate' },
  { name: 'ONC-ACB', key: 'acb' },
  { name: 'Practice Type', key: 'practiceTypeName' },
  { name: 'Real World Testing', key: 'rwt' },
];

function ChplDownloadListings(props) {
  const { analytics, toggled } = props;
  const $analytics = getAngularService('$analytics');
  const [anchor, setAnchor] = useState(null);
  const [categories, setCategories] = useState(allCategories.map((h) => ({
    ...h,
    selected: toggled.includes(h.key) ? !h.selected : h.selected,
  })));
  const [listings, setListings] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setListings(props.listings.map((listing) => ({
      ...listing,
      fullEdition: `${listing.edition.name}${listing.curesUpdate ? ' Cures Update' : ''}`,
      developerName: listing.developer.name,
      productName: listing.product.name,
      versionName: listing.version.name,
      decertificationDate: listing.decertificationDate ?? '',
      certificationStatusName: listing.certificationStatus.name,
      acb: listing.certificationBody.name,
      practiceTypeName: listing.practiceType?.name ?? '',
      detailsLink: `https://chpl.healthit.gov/#/listing/${listing.id}`,
      criteria: listing.criteriaMet.sort(sortCriteria).map((cc) => `${cc.number}: ${cc.title}`).join('\n'),
      cqms: listing.cqmsMet.map((cqm) => ({ ...cqm, name: cqm.number })).sort(sortCqms).map((cqm) => cqm.number).join('\n'),
      apiDocumentation56: listing.apiDocumentation.find((cc) => cc.criterion.id === 56)?.value || '',
      apiDocumentation181: listing.apiDocumentation.find((cc) => cc.criterion.id === 181)?.value || '',
      apiDocumentation182: listing.apiDocumentation.find((cc) => cc.criterion.id === 182)?.value || '',
      serviceBaseUrlList: listing.serviceBaseUrlList?.value || '',
      rwtPlansUrl: listing.rwtPlansUrl || '',
      rwtResultsUrl: listing.rwtResultsUrl || '',
    })));
  }, [props.listings]); // eslint-disable-line react/destructuring-assignment

  const canDownload = () => categories.some((cat) => cat.selected);

  const handleClick = (e) => {
    if (analytics) {
      $analytics.eventTrack('Open Download Filter', { category: analytics.category });
    }
    setAnchor(e.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchor(null);
    setOpen(false);
  };

  const handleDownload = () => {
    const activeCategories = categories.filter((cat) => cat.selected).map((cat) => cat.key);
    const csvExporter = new ExportToCsv({
      ...csvOptions,
      headers: allHeaders.filter((h) => activeCategories.includes(h.objectKey) || activeCategories.includes(h.group)),
    });
    if (analytics) {
      const defaulted = allCategories.filter((cat) => cat.selected || toggled.includes(cat.key));
      const added = categories.filter((cat) => cat.selected && !defaulted.some((def) => def.key === cat.key));
      const removed = defaulted.filter((def) => !categories.find((cat) => cat.selected && cat.key === def.key));
      if (added.length === 0 && removed.length === 0) {
        $analytics.eventTrack('Download Results With Default Data', { category: analytics.category });
      } else {
        added.forEach((cat) => {
          $analytics.eventTrack('Download Results With Additional Data', { category: analytics.category, label: cat.name });
        });
        removed.forEach((cat) => {
          $analytics.eventTrack('Download Results With Less Data', { category: analytics.category, label: cat.name });
        });
      }
    }
    csvExporter.generateCsv(listings);
  };

  const toggle = (header) => {
    setCategories((previous) => previous.map((p) => ({
      ...p,
      selected: header.key === p.key ? !p.selected : p.selected,
    })));
  };

  const classes = useStyles();

  return (
    <>
      <ButtonGroup>
        <Button
          aria-controls="download-listings-menu"
          aria-haspopup="true"
          onClick={handleDownload}
          disabled={!canDownload()}
          color="secondary"
          variant="contained"
          size="small"
          id="open-download-listings-menu"
        >
          Download
          {' '}
          { listings.length }
          {' '}
          Result
          { listings.length !== 1 ? 's' : '' }
        </Button>
        <ChplTooltip title="Select columns to download">
          <Button
            aria-controls="download-listings-menu"
            aria-haspopup="true"
            onClick={handleClick}
            color="secondary"
            variant="contained"
            size="small"
            style={{ margin: '0' }}
            id="open-download-listings-menu"
            className={classes.dropDownDownloads}
          >
            <ExpandMoreIcon />
          </Button>
        </ChplTooltip>
      </ButtonGroup>
      <Menu
        id="download-listings-menu"
        open={open}
        anchorEl={anchor}
        getContentAnchorEl={null}
        keepMounted
        onClose={handleClose}
        variant="selectedMenu"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          style: {
            alignItems: 'center',
            borderRadius: '0 0 8px 8px',
            border: `1px solid ${palette.grey}`,
            boxShadow: 'rgb(149 157 165 / 40%) 0px 6px 16px 6px',
            backgroundColor: '#fff',
          },
        }}
      >
        { categories.map((c) => [
          <MenuItem
            onClick={() => toggle(c)}
            key={c.key}
            selected={c.selected}
            style={{ gap: '8px', padding: '8px 16px' }}
          >
            <span className="sr-only">{ c.selected ? 'selected: ' : 'not selected: '}</span>
            { c.selected ? <CheckIcon /> : <CheckBoxOutlineBlankIcon color="primary" /> }
            {' '}
            { c.name }
          </MenuItem>,
          c.hasDivider && <Divider className={classes.noMargin} />,
        ])}
      </Menu>
    </>
  );
}

export default ChplDownloadListings;

ChplDownloadListings.propTypes = {
  listings: arrayOf(listingPropType),
  analytics: shape({
    category: string.isRequired,
  }),
  toggled: arrayOf(string),
};

ChplDownloadListings.defaultProps = {
  listings: [],
  analytics: undefined,
  toggled: [],
};
