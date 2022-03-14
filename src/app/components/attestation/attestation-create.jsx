import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  ThemeProvider,
  Typography,
  makeStyles,
} from '@material-ui/core';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Moment from 'react-moment';
import { useSnackbar } from 'notistack';

import ChplAttestationProgress from './attestation-progress';
import interpretLink from './attestation-util';

import { useFetchAttestationData } from 'api/attestations';
import { useFetchChangeRequestTypes, usePostChangeRequest } from 'api/change-requests';
import { ChplActionBar } from 'components/action-bar';
import { ChplTextField } from 'components/util';
import { getAngularService } from 'services/angular-react-helper';
import { UserContext } from 'shared/contexts';
import { developer as developerPropType } from 'shared/prop-types';
import theme from 'themes/theme';

const useStyles = makeStyles({
  iconSpacing: {
    marginLeft: '4px',
  },
  pageHeader: {
    padding: '8px 0',
  },
  nonCaps: {
    textTransform: 'none',
  },
  radioGroup: {
    textTransform: 'none',
  },
  attestationContainer: {
    display: 'grid',
    rowGap: '16px',
    columnGap: '16px',
    justifyContent: 'stretch',
    gridTemplateColumns: 'repeat(6, 1fr)',
  },
  attestationContainerList: {
    fontSize: '0.875em',
  },
  forAssistanceContainer: {
    marginTop: '16px',
  },
  fullWidthContainer: {
    gridColumn: '1 / -1',
  },
  nameContainer: {
    gridColumn: '1 / 3',
  },
  nameOnlyContainer: {
    gridColumn: '1 / 4',
  },
  titleContainer: {
    gridColumn: '3 / 5',
  },
  developerContainer: {
    gridColumn: '5 / 7',
  },
  developerOnlyContainer: {
    gridColumn: '4 / 7',
  },
  signatureContainer: {
    gridColumn: '1 / 6',
  },
  dateContainer: {
    gridColumn: '6 / 7',
  },
});

function ChplAttestationCreate(props) {
  const $state = getAngularService('$state');
  const DateUtil = getAngularService('DateUtil');
  const { developer } = props;
  const { data, isLoading } = useFetchAttestationData();
  const crData = useFetchChangeRequestTypes();
  const { mutate } = usePostChangeRequest();
  const { enqueueSnackbar } = useSnackbar();
  const [attestationResponses, setAttestationResponses] = useState({});
  const [changeRequestType, setChangeRequestType] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signature, setSignature] = useState('');
  const [stage, setStage] = useState(0);
  const { user } = useContext(UserContext);
  const classes = useStyles();

  useEffect(() => {
    if (isLoading) {
      setAttestationResponses([]);
      return;
    }
    setAttestationResponses(data.attestations
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((attestation) => ({
        attestation: {
          ...attestation,
          display: interpretLink(attestation.description),
          validResponses: attestation.validResponses.sort((a, b) => a.sortOrder - b.sortOrder),
        },
        response: { response: '' },
      })));
  }, [isLoading, data]);

  useEffect(() => {
    if (crData.isLoading) {
      return;
    }
    setChangeRequestType(crData.data.data.find((type) => type.name === 'Developer Attestation Change Request'));
  }, [crData.data, crData.isLoading]);

  const isFormFilledOut = () => attestationResponses.reduce((filledOut, attestation) => filledOut && !!attestation.response.id, true);

  const isSubmitDisabled = () => (signature !== user.fullName) || isSubmitting;

  const canNext = () => stage === 0 || (stage === 1 && isFormFilledOut());

  const canPrevious = () => stage > 0 && stage < 3;

  const handleActionBarDispatch = () => {
    $state.go('organizations.developers.developer', { developerId: developer.developerId });
  };

  const handleProgressDispatch = (action) => setStage(stage + (action === 'next' ? 1 : -1));

  const handleSignature = (event) => {
    setSignature(event.target.value);
  };

  const handleResponse = (attestation, value) => {
    const updated = attestationResponses.map((att) => {
      const updatedAttestation = {
        ...att,
      };
      if (attestation.attestation.id === att.attestation.id) {
        updatedAttestation.response = att.attestation.validResponses.find((response) => response.response === value);
      }
      return updatedAttestation;
    });
    setAttestationResponses(updated);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    const payload = {
      changeRequestType,
      developer,
      details: {
        attestationResponses,
        signature,
      },
    };
    mutate(payload, {
      onSuccess: () => {
        setIsSubmitting(false);
        setStage(3);
      },
      onError: (error) => {
        setIsSubmitting(false);
        if (error.response.data.error?.startsWith('Email could not be sent to')) {
          enqueueSnackbar(`${error.response.data.error} However, the changes have been applied`, {
            variant: 'info',
          });
          setStage(3);
        } else {
          const message = error.response.data?.error
                || error.response.data?.errorMessages.join(' ');
          enqueueSnackbar(message, {
            variant: 'error',
          });
        }
      },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.pageHeader} maxWidth="md">
        <Typography gutterBottom variant="h1">
          Submit Attestations
        </Typography>
      </Container>
      <ChplAttestationProgress
        dispatch={handleProgressDispatch}
        value={stage}
        canNext={canNext()}
        canPrevious={canPrevious()}
      />
      { stage === 0
        && (
          <>
            <Container maxWidth="md">
              <Typography gutterBottom variant="h2">
                Section 1 &mdash; Introduction
              </Typography>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="body1">
                    <strong>
                      The Conditions and Maintenance of Certification requirements, as outlined in 42 U.S.C. 300jj-11(c)(5)(D), are initial and ongoing requirements that a health IT developer of certified health IT and its certified Health IT Module(s) must meet or adhere to in order to maintain their certification status in the ONC Health IT Certification Program (Certification Program).
                    </strong>
                  </Typography>
                  <Divider />
                  <Typography gutterBottom variant="body1">
                    A health IT developer of certified health IT, or its authorized representative that is capable of binding the health IT developer, must provide the Secretary of Health and Human Services an attestation of compliance with the Conditions and Maintenance of Certification requirements (
                    <a href="https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-D/section-170.406">45 CFR 170.406</a>
                    ;
                    {' '}
                    <a href="https://www.federalregister.gov/documents/2020/05/01/2020-07419/21st-century-cures-act-interoperability-information-blocking-and-the-onc-health-it-certification#page-25781">85 FR 25781</a>
                    ). ONC-Authorized Certification Bodies (ONC-ACBs) review and submit attestations to ONC for public availability (
                    <a href="https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-E#p-170.523(q)">45 CFR 170.523(q)</a>
                    ).
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    Please proceed to review the Attestations and attest to the compliance, noncompliance, or the inapplicability of each Condition and Maintenance of Certification requirement for your health IT developer of certified health IT.
                  </Typography>
                  <Typography variant="body1">
                    Irrespective of your attestation, note that under certain circumstances ONC may directly review the actions or practices of a health IT developer of certified health IT, or its certified health IT, to determine whether they conform to the requirements of the Certification Program (
                    <a href="https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-170/subpart-E/section-170.580#p-170.580(a)(2)">45 CFR 170.580(a)(2)</a>
                    ).  Determinations made pursuant to such review may, as necessary, result in corrective action and enforcement procedures under the Certification Program.
                  </Typography>
                </CardContent>
              </Card>
              <Typography gutterBottom className={classes.forAssistanceContainer} variant="body1">
                For assistance with the Attestation submission process, please see the
                {' '}
                <a href="https://inquiry.healthit.gov/support/plugins/servlet/loginfreeRedirMain?portalid=2&request=51">Health IT Feedback and Inquiry Portal</a>
                {' '}
                to submit a ticket as applicable --
              </Typography>
              <ul className={classes.attestationContainerList}>
                <li>For questions regarding the Attestations Condition and Maintenance of Certification requirement, please select the &quot;Attestations Condition&quot; category.</li>
                <li>For questions regarding a Condition and Maintenance of Certification requirement other than Attestations, please select the relevant Condition category.</li>
                <li>For technical assistance with this process, please select the &quot;CHPL&quot; category.</li>
              </ul>
            </Container>
          </>
        )}
      { stage === 1
        && (
          <>
            <Container maxWidth="md">
              <Typography gutterBottom variant="h2">
                Section 2 &mdash; Attestations
              </Typography>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="body1">
                    <strong>Attestation Period:</strong>
                    {' '}
                    [
                    {DateUtil.getDisplayDateFormat(data.period?.periodStart)}
                    {' '}
                    -
                    {' '}
                    {DateUtil.getDisplayDateFormat(data.period?.periodEnd)}
                    ]
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    As a health IT developer of certified health IT that had an active certification under the ONC Health IT Certification Program at any time during the Attestation Period, please indicate your compliance, noncompliance, or the inapplicability of each Condition and Maintenance of Certification requirement for the portion of the Attestation Period you had an active certification.
                  </Typography>
                  <Typography variant="body1">
                    Select only one response for each statement.
                  </Typography>
                  <Divider />
                  {attestationResponses
                    .map((attestation, idx) => (
                      <div key={attestation.attestation.id}>
                        <Typography variant="subtitle1">
                          { idx + 1 }
                          :
                          {' '}
                          { attestation.attestation.condition.name }
                        </Typography>
                        <FormControl key={attestation.attestation.id} component="fieldset">
                          <FormLabel className={classes.nonCaps}>{attestation.attestation.display}</FormLabel>
                          <RadioGroup
                            className={classes.radioGroup}
                            name={`response-${attestation.attestation.id}`}
                            value={attestation.response.response}
                            onChange={(event) => handleResponse(attestation, event.currentTarget.value)}
                          >
                            {attestation.attestation.validResponses
                              .map((response) => (
                                <FormControlLabel
                                  key={response.id}
                                  value={response.response}
                                  control={<Radio />}
                                  label={response.response}
                                  className={classes.nonCaps}
                                />
                              ))}
                          </RadioGroup>
                        </FormControl>
                        { idx !== attestationResponses.length - 1
                          && (
                            <Divider />
                          )}
                      </div>
                    ))}
                </CardContent>
              </Card>
            </Container>
          </>
        )}
      { stage === 2
        && (
          <>
            <Container maxWidth="md" className={classes.attestationContainer}>
              <Typography variant="h2" className={classes.fullWidthContainer}>
                Section 3 &mdash; Electronic Signature
              </Typography>
              <Card className={classes.fullWidthContainer}>
                <CardContent>
                  <Typography gutterBottom variant="body1">
                    As a health IT developer of certified health IT, or as an authorized representative that is capable of binding the health IT developer, I certify the Attestations to the Secretary of Health and Human Services provided here are true and correct to the best of my knowledge and belief.
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    I understand that under certain circumstances ONC may directly review the actions or practices of a health IT developer of certified health IT, or its certified health IT, to determine whether they conform to the requirements of the Certification Program. This may result in corrective action and enforcement procedures under the Certification Program as necessary.
                  </Typography>
                  <Typography variant="body1">
                    I also understand that submitting a false attestation may subject my company and me to liability under Federal law.
                  </Typography>
                </CardContent>
              </Card>
              <Typography className={classes.fullWidthContainer}>
                Typing your name below signifies you are completing the Attestations using an electronic signature. To continue with the electronic signature process, please enter your name and click the “Sign Electronically” button to confirm and submit the Attestations to your ONC-Authorized Certification Body (ONC-ACB) for review.
              </Typography>
              <Card className={user.title ? classes.nameContainer : classes.nameOnlyContainer}>
                <CardContent>
                  <div>
                    <Typography gutterBottom variant="subtitle1">
                      Name:
                    </Typography>
                    <Typography variant="body1">{user.fullName}</Typography>
                  </div>
                </CardContent>
              </Card>
              { user.title && (
                <Card className={classes.titleContainer}>
                  <CardContent>
                    <div>
                      <Typography gutterBottom variant="subtitle1">
                        Title:
                      </Typography>
                      <Typography variant="body1">{user.title}</Typography>
                    </div>
                  </CardContent>
                </Card>
              )}
              <Card className={user.title ? classes.developerContainer : classes.developerOnlyContainer}>
                <CardContent>
                  <div>
                    <Typography gutterBottom variant="subtitle1">
                      Health IT Developer:
                    </Typography>
                    <Typography variant="body1">{developer.name}</Typography>
                  </div>
                </CardContent>
              </Card>
              <Card className={classes.signatureContainer}>
                <CardContent>
                  <ChplTextField
                    id="signature"
                    name="signature"
                    label="Electronic Signature"
                    required
                    value={signature}
                    onChange={handleSignature}
                    helperText="Enter your name as it appears above"
                  />
                </CardContent>
              </Card>
              <Card className={classes.dateContainer}>
                <CardContent>
                  <Typography gutterBottom variant="subtitle1">
                    Date:
                  </Typography>
                  <Typography variant="body1">
                    <Moment
                      date={Date.now()}
                      format="DD MMM yyyy"
                    />
                  </Typography>
                </CardContent>
              </Card>
              <div className={classes.fullWidthContainer}>
                <Button
                  fullWidth
                  id="sign-electronically"
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={isSubmitDisabled()}
                >
                  Sign Electronically
                  <BorderColorIcon
                    className={classes.iconSpacing}
                  />
                </Button>
              </div>
            </Container>
          </>
        )}
      { stage === 3
        && (
          <>
            <Container maxWidth="md">
              <Typography gutterBottom variant="h2" className={classes.fullWidthContainer}>
                Section 4 &mdash; Confirmation
              </Typography>
              <Card>
                <CardContent>
                  <Typography variant="body1">
                    Thank you for your Attestations Condition and Maintenance of Certification submission for the ONC Health IT Certification Program. An email confirmation has been sent to the registered CHPL users associated with
                    {' '}
                    {developer.name}
                    . Please direct any inquiries regarding your submission to your ONC-Authorized Certification Body (ONC-ACB).
                  </Typography>
                </CardContent>
              </Card>
            </Container>
          </>
        )}
      <ChplActionBar
        dispatch={handleActionBarDispatch}
        canCancel={stage !== 3}
        canClose={stage === 3}
        canSave={false}
      />
    </ThemeProvider>
  );
}

export default ChplAttestationCreate;

ChplAttestationCreate.propTypes = {
  developer: developerPropType.isRequired,
};
