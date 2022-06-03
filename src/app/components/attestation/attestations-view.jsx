import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { func } from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';

import ChplAttestationCreateException from './attestation-create-exception';
import ChplAttestationView from './attestation-view';

import { useFetchAttestations } from 'api/developer';
import { ChplDialogTitle } from 'components/util';
import { getDisplayDateFormat } from 'services/date-util';
import { UserContext } from 'shared/contexts';
import { developer as developerPropType } from 'shared/prop-types';

const useStyles = makeStyles({
  content: {
    display: 'grid',
    gap: '16px',
  },
});

function ChplAttestationsView(props) {
  const { hasAnyRole, hasAuthorityOn } = useContext(UserContext);
  const [activeAttestations, setActiveAttestations] = useState({});
  const [attestationsOpen, setAttestationsOpen] = useState(false);
  const [attestations, setAttestations] = useState([]);
  const [developer, setDeveloper] = useState({});
  const { data: { canSubmitAttestationChangeRequest = false, canCreateException = false, developerAttestations = [] } = {} } = useFetchAttestations({ developer, isAuthenticated: hasAnyRole(['ROLE_ADMIN', 'ROLE_ONC', 'ROLE_ONC_STAFF', 'ROLE_ACB', 'ROLE_DEVELOPER']) });
  const [isCreatingException, setIsCreatingException] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (props?.developer) {
      setAttestations(props.developer.attestations.sort((a, b) => (b.attestationPeriod.periodStart < a.attestationPeriod.periodStart ? -1 : 1)));
      setDeveloper(props.developer);
    }
  }, [props?.developer]);

  const createAttestationChangeRequest = () => {
    props.dispatch('createAttestation');
  };

  const canSeeAttestationData = () => hasAnyRole(['ROLE_ADMIN', 'ROLE_ONC', 'ROLE_ONC_STAFF', 'ROLE_ACB'])
        || (hasAnyRole(['ROLE_DEVELOPER']) && hasAuthorityOn({ id: developer.developerId }));

  const canSeeUnsubmittedAttestationData = () => hasAnyRole(['ROLE_ADMIN', 'ROLE_ONC', 'ROLE_ONC_STAFF', 'ROLE_ACB']);

  const closeAttestations = () => setAttestationsOpen(false);

  const handleDispatch = (action) => {
    switch (action) {
      case 'cancel':
        setIsCreatingException(false);
        break;
      case 'saved':
        setIsCreatingException(false);
        break;
        // no default
    }
  };

  const viewAttestations = (selected) => {
    setActiveAttestations(developerAttestations.find((att) => att.id === selected.id));
    setAttestationsOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader title="Attestations" />
        <CardContent className={classes.content}>
          { !isCreatingException
            && (
              <>
                <Typography variant="body1">
                  Attestations information is displayed here if a health IT developer’s attestation of compliance with the
                  {' '}
                  <a href="https://www.healthit.gov/topic/certification-ehrs/conditions-maintenance-certification">Conditions and Maintenance of Certification requirements</a>
                  {' '}
                  was submitted. For more information, please visit the
                  {' '}
                  <a href="https://www.healthit.gov/sites/default/files/page/2022-02/Attestations_Fact-Sheet.pdf">Attestations Fact Sheet</a>
                  .
                </Typography>
                { attestations.filter((att) => att.status === 'ATTESTATIONS_SUBMITTED' || canSeeUnsubmittedAttestationData()).length > 0
                  && (
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Attestation Period</TableCell>
                            <TableCell>Status</TableCell>
                            { canSeeAttestationData()
                              && (
                                <TableCell>
                                  <span className="sr-only">View Details</span>
                                </TableCell>
                              )}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          { attestations
                            .filter((att) => att.status === 'ATTESTATIONS_SUBMITTED' || canSeeUnsubmittedAttestationData())
                            .map((item) => (
                              <TableRow key={item.id}>
                                <TableCell>
                                  { getDisplayDateFormat(item.attestationPeriod.periodStart) }
                                  {' '}
                                  to
                                  {' '}
                                  { getDisplayDateFormat(item.attestationPeriod.periodEnd) }
                                </TableCell>
                                <TableCell>
                                  { item.statusText }
                                </TableCell>
                                { canSeeAttestationData()
                                && (
                                  <TableCell>
                                    <IconButton
                                      onClick={() => viewAttestations(item)}
                                      aria-label={`View attestations for period ending ${item.attestationPeriod.periodEnd}`}
                                    >
                                      <VisibilityIcon color="primary" />
                                    </IconButton>
                                  </TableCell>
                                )}
                              </TableRow>
                            ))}
                          { canSeeUnsubmittedAttestationData()
                            && (
                              <TableRow key="oldone">
                                <TableCell>
                                  fill in dates here (delete this section when developer.attestations has "not submitted yet" values)
                                </TableCell>
                                <TableCell>
                                  No Attestations submitted
                                </TableCell>
                                <TableCell>
                                  <IconButton
                                    color="primary"
                                    id="create-attestation-exception-button"
                                    variant="contained"
                                    onClick={() => setIsCreatingException(true)}
                                    disabled={!canCreateException}
                                  >
                                    <AddIcon color="primary" />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
              </>
            )}
          { isCreatingException
        && (
          <ChplAttestationCreateException
            attestations={attestations}
            developer={developer}
            dispatch={handleDispatch}
          />
        )}
        </CardContent>
        { hasAnyRole(['ROLE_DEVELOPER']) && hasAuthorityOn({ id: developer.developerId })
          && (
            <CardActions>
              <Button
                color="primary"
                id="create-attestation-change-request-button"
                variant="contained"
                onClick={createAttestationChangeRequest}
                disabled={!canSubmitAttestationChangeRequest}
              >
                Submit Attestations
              </Button>
            </CardActions>
          )}
      </Card>
      { activeAttestations
        && (
          <Dialog
            fullWidth
            maxWidth="md"
            onClose={closeAttestations}
            aria-labelledby="attestations-details"
            open={attestationsOpen}
          >
            <ChplDialogTitle
              id="attestations-details"
              onClose={closeAttestations}
            >
              View Attestations Details
            </ChplDialogTitle>
            <DialogContent
              dividers
            >
              <ChplAttestationView
                attestations={activeAttestations}
                canCreateException={canCreateException}
                developer={developer}
              />
            </DialogContent>
          </Dialog>
        )}
    </>
  );
}

export default ChplAttestationsView;

ChplAttestationsView.propTypes = {
  dispatch: func.isRequired,
  developer: developerPropType.isRequired,
};
