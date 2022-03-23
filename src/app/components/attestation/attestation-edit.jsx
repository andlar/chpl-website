import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import {
  object,
} from 'prop-types';

import ChplAttestationWizard from './attestation-wizard';
import interpretLink from './attestation-util';

import { usePutChangeRequest } from 'api/change-requests';
import { getAngularService } from 'services/angular-react-helper';

const useStyles = makeStyles({
  pageHeader: {
    padding: '8px 0',
  },
});

function ChplAttestationEdit(props) {
  const $state = getAngularService('$state');
  const { changeRequest } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { mutate } = usePutChangeRequest();
  const [attestationResponses, setAttestationResponses] = useState([]);
  const [developer, setDeveloper] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [period, setPeriod] = useState({});
  const [stage, setStage] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    if (!changeRequest?.details?.attestationResponses) {
      setAttestationResponses([]);
      return;
    }
    setAttestationResponses(changeRequest.details.attestationResponses
      .map((attestationResponse) => ({
        ...attestationResponse,
        attestation: {
          ...attestationResponse.attestation,
          display: interpretLink(attestationResponse.attestation.description),
          validResponses: attestationResponse.attestation.validResponses.sort((a, b) => a.sortOrder - b.sortOrder),
        },
      })));
    setDeveloper(changeRequest.developer);
    setPeriod(changeRequest.details.attestationPeriod);
  }, [changeRequest]);

  const handleDispatch = (action, payload) => {
    switch (action) {
      case 'close':
        $state.go('organizations.developers.developer', { developerId: developer.developerId });
        break;
      case 'stage':
        setStage(payload);
        break;
      case 'submit':
        setIsSubmitting(true);
        mutate({
          ...changeRequest,
          ...payload,
          currentStatus: {
            changeRequestStatusType: { id: 1 },
            comment: '',
          },
        }, {
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
        break;
        // no default
    }
  };

  return (
    <>
      <Container className={classes.pageHeader} maxWidth="md">
        <Typography gutterBottom variant="h1">
          Edit Attestations
        </Typography>
      </Container>
      <ChplAttestationWizard
        attestationResponses={attestationResponses}
        isSubmitting={isSubmitting}
        developer={developer}
        dispatch={handleDispatch}
        period={period}
        stage={stage}
      />
    </>
  );
}

export default ChplAttestationEdit;

ChplAttestationEdit.propTypes = {
  changeRequest: object.isRequired, // eslint-disable-line react/forbid-prop-types
};
