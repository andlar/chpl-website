import React, { useEffect, useState } from 'react';
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
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  array,
  func,
  object,
} from 'prop-types';

import interpretLink from './attestation-util';

import { ChplTextField } from 'components/util';

const useStyles = makeStyles({
  nonCaps: {
    textTransform: 'none',
  },
  radioGroup: {
    textTransform: 'none',
  },
});

function ChplAttestationWizardSection2(props) {
  const { dispatch } = props;
  const [sections, setSections] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setSections(props.sections);
    /*
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((attestation) => ({
        attestation: {
          ...attestation,
          display: interpretLink(attestation.description),
          validResponses: attestation.validResponses.sort((a, b) => a.sortOrder - b.sortOrder),
        },
        response: { response: '' },
      })));
      */
  }, [props.sections]); // eslint-disable-line react/destructuring-assignment

  const handleResponse = (attestation, value) => {
    const updated = [...sections];/* attestationResponses.map((att) => {
      const updatedAttestation = {
        ...att,
      };
      if (attestation.attestation.id === att.attestation.id) {
        updatedAttestation.response = att.attestation.validResponses.find((response) => response.response === value);
      }
      return updatedAttestation;
    }); */
    dispatch(updated);
  };

  const getQuestion = (section, idx) => section.formItems.map((question) => (
    <div key={`${section.id}-${question.id}`}>
      <Typography variant="subtitle1">
        { idx + 1 }
        :
        {' '}
        { section.name }
      </Typography>
      <FormControl key={question.id} component="fieldset">
        <FormLabel className={classes.nonCaps}>{interpretLink(question.question.question)}</FormLabel>
        <RadioGroup
          className={classes.radioGroup}
          name={`response-${question.id}`}
          value={question.submittedResponses}
          onChange={(event) => handleResponse(question, event.currentTarget.value)}
        >
          {question.question.allowedResponses
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
      { idx !== section.length - 1
        && (
          <Divider />
        )}
    </div>
  ));

  return (
    <Container maxWidth="md">
      <Typography gutterBottom variant="h2">
        Section 2 &mdash; Attestations
      </Typography>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="body1">
            As a health IT developer of certified health IT that had an active certification under the ONC Health IT Certification Program at any time during the Attestation Period, please indicate your compliance, noncompliance, or the inapplicability of each Condition and Maintenance of Certification requirement for the portion of the Attestation Period you had an active certification.
          </Typography>
          <Typography variant="body1">
            Select only one response for each statement.
          </Typography>
          <Divider />
          { sections.flatMap((section, idx) => getQuestion(section, idx)) }
        </CardContent>
      </Card>
    </Container>
  );
}

export default ChplAttestationWizardSection2;

ChplAttestationWizardSection2.propTypes = {
  sections: array.isRequired, // eslint-disable-line react/forbid-prop-types
  dispatch: func.isRequired,
};
