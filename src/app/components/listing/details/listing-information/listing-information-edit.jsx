import React, { useContext } from 'react';
import {
  FormControlLabel,
  makeStyles,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { ChplTextField } from 'components/util';
import { ListingContext } from 'shared/contexts';
import { utilStyles } from 'themes';

const useStyles = makeStyles({
  ...utilStyles,
});

const validationSchema = yup.object({
  acbCertificationId: yup.string()
    .max(250, 'Field is too long'),
  productCode: yup.string()
    .required('Field is required')
    .matches(/^[A-Za-z0-9_]{4}$/, 'Product Code must consist of letters, numbers and/or "_", and be 4 characters long'),
  versionCode: yup.string()
    .required('Field is required')
    .matches(/^[A-Za-z0-9_]{2}$/, 'Version Code must consist of letters, numbers and/or "_", and be 2 characters long'),
  icsCode: yup.string()
    .required('Field is required')
    .matches(/^[0-9]{2}$/, 'ICS Code must be a two digit single number from 00 to 99'),
  svapNoticeUrl: yup.string()
    .url('Improper format (http://www.example.com)')
    .max(1024, 'Field is too long'),
  rwtPlansUrl: yup.string()
    .url('Improper format (http://www.example.com)')
    .max(1024, 'Field is too long'),
  rwtPlansCheckDate: yup.date(),
  rwtResultsUrl: yup.string()
    .url('Improper format (http://www.example.com)')
    .max(1024, 'Field is too long'),
  rwtResultsCheckDate: yup.date(),
});

function ChplListingInformationEdit() {
  const { listing, setListing } = useContext(ListingContext);
  const classes = useStyles();
  let formik;

  const handleBasicChange = (event) => {
    setListing((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    formik.setFieldValue(event.target.name, event.target.value);
  };

  const handleProductNumberChange = (event) => {
    const parts = listing.chplProductNumber.split('.');
    switch (event.target.name) {
      case 'productCode':
        parts[4] = event.target.value;
        break;
      case 'versionCode':
        parts[5] = event.target.value;
        break;
      case 'icsCode':
        parts[6] = event.target.value;
        break;
        // no default
    }
    setListing((prev) => ({
      ...prev,
      chplProductNumber: parts.join('.'),
    }));
    formik.setFieldValue(event.target.name, event.target.value);
  };

  const getPrefix = () => {
    const parts = listing.chplProductNumber.split('.');
    return `${parts[0]}.${parts[1]}.${parts[2]}.${parts[3]}`;
  };

  const getSuffix = () => {
    const parts = listing.chplProductNumber.split('.');
    return `${parts[7]}.${parts[8]}`;
  };

  formik = useFormik({
    initialValues: {
      acbCertificationId: listing.acbCertificationId ?? '',
      productCode: listing.chplProductNumber.split('.')[4] ?? '',
      versionCode: listing.chplProductNumber.split('.')[5] ?? '',
      icsCode: listing.chplProductNumber.split('.')[6] ?? '',
      svapNoticeUrl: listing.svapNoticeUrl ?? '',
      rwtPlansUrl: listing.rwtPlansUrl ?? '',
      rwtPlansCheckDate: listing.rwtPlansCheckDate ?? '',
      rwtResultsUrl: listing.rwtResultsUrl ?? '',
      rwtResultsCheckDate: listing.rwtResultsCheckDate ?? '',
    },
    validationSchema,
  });

  if (!listing) { return null; }

  return (
    <>
      CHPL Product Number
      { getPrefix() }
      <ChplTextField
        id="product-code"
        name="productCode"
        label="Product Code"
        value={formik.values.productCode}
        onChange={handleProductNumberChange}
        onBlur={formik.handleBlur}
        error={formik.touched.productCode && !!formik.errors.productCode}
        helperText={formik.touched.productCode && formik.errors.productCode}
      />
      <ChplTextField
        id="version-code"
        name="versionCode"
        label="Version Code"
        value={formik.values.versionCode}
        onChange={handleProductNumberChange}
        onBlur={formik.handleBlur}
        error={formik.touched.versionCode && !!formik.errors.versionCode}
        helperText={formik.touched.versionCode && formik.errors.versionCode}
      />
      <ChplTextField
        id="ics-code"
        name="icsCode"
        label="ICS Code"
        value={formik.values.icsCode}
        onChange={handleProductNumberChange}
        onBlur={formik.handleBlur}
        error={formik.touched.icsCode && !!formik.errors.icsCode}
        helperText={formik.touched.icsCode && formik.errors.icsCode}
      />
      { getSuffix() }
      <ChplTextField
        id="acb-certification-id"
        name="acbCertificationId"
        label="ONC-ACB Certification ID"
        value={formik.values.acbCertificationId}
        onChange={handleBasicChange}
        onBlur={formik.handleBlur}
        error={formik.touched.acbCertificationId && !!formik.errors.acbCertificationId}
        helperText={formik.touched.acbCertificationId && formik.errors.acbCertificationId}
      />
      <ChplTextField
        id="svap-notice-url"
        name="svapNoticeUrl"
        label="Standards Version Advancement Process Notice"
        value={formik.values.svapNoticeUrl}
        onChange={handleBasicChange}
        onBlur={formik.handleBlur}
        error={formik.touched.svapNoticeUrl && !!formik.errors.svapNoticeUrl}
        helperText={formik.touched.svapNoticeUrl && formik.errors.svapNoticeUrl}
      />
      <ChplTextField
        id="rwt-plans-url"
        name="rwtPlansUrl"
        label="Plans URL"
        value={formik.values.rwtPlansUrl}
        onChange={handleBasicChange}
        onBlur={formik.handleBlur}
        error={formik.touched.rwtPlansUrl && !!formik.errors.rwtPlansUrl}
        helperText={formik.touched.rwtPlansUrl && formik.errors.rwtPlansUrl}
      />
      <ChplTextField
        id="rwt-plans-check-date"
        name="rwtPlansCheckDate"
        label="Plans Last ONC-ACB Completeness Check"
        type="date"
        value={formik.values.rwtPlansCheckDate}
        onChange={handleBasicChange}
        onBlur={formik.handleBlur}
        error={formik.touched.rwtPlansCheckDate && !!formik.errors.rwtPlansCheckDate}
        helperText={formik.touched.rwtPlansCheckDate && formik.errors.rwtPlansCheckDate}
      />
      <ChplTextField
        id="rwt-results-url"
        name="rwtResultsUrl"
        label="Results URL"
        value={formik.values.rwtResultsUrl}
        onChange={handleBasicChange}
        onBlur={formik.handleBlur}
        error={formik.touched.rwtResultsUrl && !!formik.errors.rwtResultsUrl}
        helperText={formik.touched.rwtResultsUrl && formik.errors.rwtResultsUrl}
      />
      <ChplTextField
        id="rwt-results-check-date"
        name="rwtResultsCheckDate"
        label="Results Last ONC-ACB Completeness Check"
        type="date"
        value={formik.values.rwtResultsCheckDate}
        onChange={handleBasicChange}
        onBlur={formik.handleBlur}
        error={formik.touched.rwtResultsCheckDate && !!formik.errors.rwtResultsCheckDate}
        helperText={formik.touched.rwtResultsCheckDate && formik.errors.rwtResultsCheckDate}
      />
    </>
  );
}

export default ChplListingInformationEdit;

ChplListingInformationEdit.propTypes = {
};
