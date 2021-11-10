import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Container,
  Divider,
  FormControlLabel,
  MenuItem,
  Switch,
  Stepper,
  Step,
  StepLabel,
  makeStyles,
  ThemeProvider,
  Typography,
  Button,
  CardHeader,
} from '@material-ui/core';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { arrayOf, func } from 'prop-types';
import { useFormik } from 'formik';
import * as yup from 'yup';

import theme from '../../../themes/theme';
import { developer as developerProp } from '../../../shared/prop-types';
import { ChplTextField } from '../../util';

import ChplConfirmDeveloperAddress from './address';
import ChplConfirmDeveloperContact from './contact';

const useStyles = makeStyles(() => ({
  developerConfirm: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '32px',
    padding: '32px',
    alignItems: 'start',
  },
  developerSubContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    alignItems: 'center',
    textAlign: 'center',
    gap: '32px',
  },
  formContainer: {
    display: 'flex',
    gap: '16px',
    flexDirection:'column',
  },
  formSubContainer: {
    display: 'grid',
    gap: '16px',
    flexDirection:'row',
    gridTemplateColumns:'auto auto',
  },
  rejectButton: {
    backgroundColor: '#c44f65',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#853544',
    },
  },
  stepper: {
    borderRadius: '64px',
    padding: '16px',
    margin: '0 32px',
    border: '0.5px solid #c2c6ca',
    boxShadow: 'rgb(149 157 165 / 10%) 0 4px 8px',
  },
  verticalDivider: {
    height: '25%',
  },
  buttonCard: {
    padding: '32px',
    backgroundColor: '#fff',
    whiteSpace: 'pre-wrap',
  },
  iconSpacing: {
    marginLeft: '4px',
  },
}));

const validationSchema = yup.object({
  name: yup.string()
    .required('Developer Name is required'),
  website: yup.string()
    .required('Website is required')
    .url('Enter a valid website'),
  line1: yup.string()
    .required('Line 1 is required'),
  city: yup.string()
    .required('City is required'),
  state: yup.string()
    .required('State is required'),
  zipcode: yup.string()
    .required('Zip is required'),
  country: yup.string()
    .required('Country is required'),
  fullName: yup.string()
    .required('Name is required'),
  email: yup.string()
    .required('Email is required')
    .email('Enter a valid email'),
  phoneNumber: yup.string()
    .required('Phone is required'),
});

function ChplConfirmDeveloper(props) {
  /* eslint-disable react/destructuring-assignment */
  const developer = {
    ...props.developer,
  };
  const [selectedDeveloper, setSelectedDeveloper] = useState('');
  const developers = props.developers
    .filter((d) => !d.deleted)
    .sort((a, b) => (a.name < b.name ? -1 : 1));
  const [isCreating, setIsCreating] = useState(!props.developer.developerId);
  /* eslint-enable react/destructuring-assignment */

  useEffect(() => {
    setSelectedDeveloper(props.developers.filter((d) => d.developerId === props.developer.developerId)[0]);
  }, [props.developer, props.developers]); // eslint-disable-line react/destructuring-assignment

  let formik;

  const handleCreationToggle = () => {
    if (isCreating) {
      props.dispatch('select', selectedDeveloper);
    } else {
      formik.handleSubmit();
    }
    setIsCreating(!isCreating);
  };

  const handleChange = (...args) => {
    formik.handleChange(...args);
    formik.handleSubmit();
  };

  const handleSelectOnChange = (event) => {
    props.dispatch('select', event.target.value);
    setSelectedDeveloper(event.target.value);
  };

  const classes = useStyles();

  const submit = () => {
    props.dispatch('edit', {
      name: formik.values.name,
      website: formik.values.website,
      selfDeveloper: formik.values.selfDeveloper,
      address: {
        line1: formik.values.line1,
        line2: formik.values.line2,
        city: formik.values.city,
        state: formik.values.state,
        zipcode: formik.values.zipcode,
        country: formik.values.country,
      },
      contact: {
        fullName: formik.values.fullName,
        title: formik.values.title,
        email: formik.values.email,
        phoneNumber: formik.values.phoneNumber,
      },
    });
  };

  formik = useFormik({
    initialValues: {
      name: developer?.name || '',
      website: developer?.website || '',
      selfDeveloper: developer?.selfDeveloper || false,
      line1: developer?.address?.line1 || '',
      line2: developer?.address?.line2 || '',
      city: developer?.address?.city || '',
      state: developer?.address?.state || '',
      zipcode: developer?.address?.zipcode || '',
      country: developer?.address?.country || '',
      fullName: developer?.contact?.fullName || '',
      title: developer?.contact?.title || '',
      email: developer?.contact?.email || '',
      phoneNumber: developer?.contact?.phoneNumber || '',
    },
    onSubmit: () => {
      submit();
    },
    validationSchema,
    validateOnChange: false,
    validateOnMount: true,
  });

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Stepper className={classes.stepper}>
          <Step>
            <StepLabel>Developer</StepLabel>
          </Step>
          <Step>
            <StepLabel>Product</StepLabel>
          </Step>
          <Step>
            <StepLabel>Version</StepLabel>
          </Step>
          <Step>
            <StepLabel>Listing</StepLabel>
          </Step>
        </Stepper>
        <form noValidate>
          <div className={classes.developerConfirm}>
            <div className={classes.developerSubContainer}>
              <Button
                className={classes.buttonCard}
                variant="outlined"
                color="default"
                fullWidth
              >
                Create a developer
                <AddCircleIcon color="primary" className={classes.iconSpacing}></AddCircleIcon>
              </Button>
              <div>
                <Divider></Divider>
                <Typography>OR</Typography>
                <Divider ></Divider>
              </div>
              <div>
                {selectedDeveloper
                  ? (
                    <>
                      <Button
                        variant="outlined"
                        color="default"
                        fullWidth
                        className={classes.buttonCard}
                      >
                        Use An Existing Developer
                        <CheckCircleIcon color="primary" className={classes.iconSpacing}></CheckCircleIcon>
                      </Button>
                    </>
                  ) : (
                    <>
                      Choose a developer to use
                    </>
                  )}
              </div>
            </div>
            <Divider />
            {isCreating
              ? (
                <Card>
                  <CardHeader title="Creating A New Developer"></CardHeader>
                  <CardContent>
                    <div className={classes.formContainer}>
                      <div className={classes.formSubContainer}>
                        <div>
                          <ChplTextField
                            id="name"
                            name="name"
                            label="Developer Name"
                            value={formik.values.name}
                            error={formik.touched.name && !!formik.errors.name}
                            helperText={formik.touched.name && formik.errors.name}
                            onChange={handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                        <div>
                          <FormControlLabel
                            label={`Self-Developer (${formik.values.selfDeveloper ? 'Yes' : 'No'})`}
                            control={(
                              <Switch
                                id="self-developer"
                                name="selfDeveloper"
                                color="primary"
                                checked={formik.values.selfDeveloper}
                                onChange={handleChange}
                              />
                            )}
                          />
                        </div>
                        <div>
                          <ChplTextField
                            id="website"
                            name="website"
                            label="Website"
                            value={formik.values.website}
                            error={formik.touched.website && !!formik.errors.website}
                            helperText={formik.touched.website && formik.errors.website}
                            onChange={handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                      </div>
                      <div className={classes.formSubContainer}>
                        <ChplConfirmDeveloperAddress
                          address={developer.address}
                          editing
                          formik={formik}
                          handleChange={handleChange}
                        />
                      </div>
                      <div className={classes.formSubContainer}>
                        <ChplConfirmDeveloperContact
                          contact={developer.contact}
                          editing
                          formik={formik}
                          handleChange={handleChange}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
              : (
                <Card>
                  <CardHeader title="Existing Developers"></CardHeader>
                  <CardContent>
                    <div>
                      <ChplTextField
                        select
                        id="selected-developer"
                        name="selectedDeveloper"
                        label="Select a Developer"
                        required
                        value={selectedDeveloper}
                        onChange={handleSelectOnChange}
                      >
                        {developers.map((item) => (
                          <MenuItem value={item} key={item.developerId}>
                            {item.name}
                            {item.developerCode && (` (Developer Code: ${item.developerCode})`)}
                          </MenuItem>
                        ))}
                      </ChplTextField>
                    </div>
                  </CardContent>
                </Card>
              )}
            <Switch
              id="create-toggle"
              name="createDeveloper"
              color="primary"
              checked={!isCreating}
              onChange={handleCreationToggle}
            />
          </div>
        </form>
      </Container>
    </ThemeProvider >
  );
}

export default ChplConfirmDeveloper;

ChplConfirmDeveloper.propTypes = {
  developer: developerProp.isRequired,
  developers: arrayOf(developerProp).isRequired,
  dispatch: func.isRequired,
};

/*
  display?
                          { developer.developerId &&
                          <>
                            <Grid item xs={6}>
                              <Typography variant="subtitle2">Developer Code</Typography>
                              <Typography variant="body1">{ developer.developerCode }</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="subtitle2">Self Developer</Typography>
                              <Typography variant="body1">{ developer.selfDeveloper ? 'Yes' : 'No' }</Typography>
                            </Grid>
                            <Grid>
                              <Typography variant="subtitle2">Website</Typography>
                              <Typography variant="body1">{ developer.website }</Typography>
                            </Grid>
                            <Grid>
                              <ChplConfirmDeveloperAddress
                                address={developer.address}
                                editing={false}
                                formik={formik}
                              />
                            </Grid>
                            <Grid>
                              <ChplConfirmDeveloperContact
                                contact={developer.contact}
                                editing={false}
                                formik={formik}
                              />
                            </Grid>
                          </>
                        }
                        */
