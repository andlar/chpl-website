import React, { useContext, useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { object } from 'prop-types';

import ChplSedParticipantsEdit from './sed-participants-edit';

import { sortCriteria } from 'services/criteria.service';
import { ListingContext } from 'shared/contexts';
import { palette, utilStyles, theme } from 'themes';

const useStyles = makeStyles({
  ...utilStyles,
  accordion: {
    borderRadius: '4px',
    display: 'grid',
    borderColor: palette.divider,
    borderWidth: '.5px',
    borderStyle: 'solid',
  },
  accordionSummary: {
    backgroundColor: `${palette.white} !important`,
    borderRadius: '4px',
    padding: '0 4px',
    borderBottom: `.5px solid ${palette.divider}`,
  },
  summaryText: {
    textTransform: 'none',
  },
  accordionDetails: {
    borderRadius: '0 0 8px 8px',
  },
  deleteButton: {
    color: palette.error,
    marginTop: '12px',
  },
  taskData: {
    display: 'grid',
    flexDirection: 'column',
    gridTemplateColumns: '1fr',
    gridGap: '16px',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
  rotate: {
    transform: 'rotate(180deg)',
  },
});

const makeRounded = (val) => Math.round(val * 1000) / 1000;

const makePercentage = (val) => `${makeRounded(val * 100)}%`;

function ChplSedTaskEdit({ task: initialTask }) {
  const { listing, setListing } = useContext(ListingContext);
  const [expanded, setExpanded] = useState(false);
  const [meanExperience, setMeanExperience] = useState(0);
  const [task, setTask] = useState(undefined);
  const [occupations, setOccupations] = useState([]);
  const classes = useStyles();

  const getIcon = () => (expanded
    ? (
      <>
        <Typography color="primary" variant="body2">Hide Details</Typography>
        <ExpandMoreIcon color="primary" fontSize="large" className={classes.rotate} />
      </>
    )
    : (
      <>
        <Typography color="primary" variant="body2">Show Details</Typography>
        <ExpandMoreIcon color="primary" fontSize="large" />
      </>
    ));

  useEffect(() => {
    if (!initialTask) { return; }
    setTask(initialTask);
    setMeanExperience(makeRounded(initialTask.testParticipants.reduce((sum, participant) => sum + participant.productExperienceMonths, 0) / initialTask.testParticipants.length));
    const occupationsObj = initialTask.testParticipants.reduce((obj, participant) => {
      if (!obj[participant.occupation]) {
        return {
          ...obj,
          [participant.occupation]: 1,
        };
      }
      return {
        ...obj,
        [participant.occupation]: obj[participant.occupation] + 1,
      };
    }, {});
    setOccupations(Object
      .entries(occupationsObj)
      .map(([key, value]) => ({
        name: key,
        count: value,
        percentage: makePercentage(value / initialTask.testParticipants.length),
      }))
      .sort((a, b) => (a.name < b.name ? -1 : 1)));
  }, [initialTask]);

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  const remove = () => {
    setListing({
      ...listing,
      sed: {
        ...listing.sed,
        testTasks: listing.sed.testTasks
          .filter((t) => t.description !== task.description),
      },
    });
  };

  if (!task) { return null; }

  return (
    <Accordion
      className={classes.accordion}
      onChange={handleAccordionChange}
      id={`task-id-${task.id}`}
    >
      <AccordionSummary
        className={classes.accordionSummary}
        expandIcon={getIcon()}
        id={`task-id-${task.id}-header`}
      >
        <Typography variant="subtitle1" className={classes.summaryText}>
          {task.description}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        className={classes.accordionDetails}
        id={`task-id-${task.id}-details`}
      >
        <CardContent>
          <Box className={classes.taskData}>
            <Card className={classes.fullWidthGridRow} id="summary">
              <CardHeader
                action={(
                  <Button endIcon={<DeleteIcon fontSize="small" color="error" />} onClick={() => remove()} className={classes.deleteButton}>
                    Delete Tasking Task
                  </Button>
              )}
                title="Summary"
              />
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell size="small">Task Description</TableCell>
                    <TableCell size="small">{ task.description }</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell size="small">Associated Certification Criteria</TableCell>
                    <TableCell size="small">
                      <List>
                        {task.criteria
                          .sort(sortCriteria)
                          .map((criterion) => (
                            <ListItem key={criterion.id}>
                              { criterion.removed && 'Removed | ' }
                              { criterion.number }
                            </ListItem>
                          ))}
                      </List>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
            <Card id="rating">
              <CardHeader title="Rating" />
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell size="small">Rating Scale</TableCell>
                    <TableCell size="small">{ task.taskRatingScale }</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell size="small">Task Rating</TableCell>
                    <TableCell size="small">{ task.taskRating }</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell size="small">Task Rating - Standard Deviation</TableCell>
                    <TableCell size="small">{ task.taskRatingStddev }</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
            <Card>
              <CardHeader title="Task Time" />
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell size="small">Task Time - Mean (s) </TableCell>
                    <TableCell size="small">{ task.taskTimeAvg }</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell size="small">Task Time - Standard Deviation (s)</TableCell>
                    <TableCell size="small">{ task.taskTimeStddev }</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell size="small">Task Time Deviation - Observed/Optimal (s)</TableCell>
                    <TableCell size="small">
                      { task.taskTimeDeviationObservedAvg }
                      {' '}
                      /
                      {' '}
                      { task.taskTimeDeviationOptimalAvg }
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
            <Card id="success">
              <CardHeader title="Task Success" />
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell size="small">Task Success - Mean (%) </TableCell>
                    <TableCell size="small">{ task.taskSuccessAverage }</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell size="small">Task Success - Standard Deviation (%)</TableCell>
                    <TableCell size="small">{ task.taskSuccessStddev }</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
            <Card>
              <CardHeader title="Task Errors" />
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell size="small">Task Errors - Mean (%) </TableCell>
                    <TableCell size="small">{ task.taskErrors }</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell size="small">Task Errors - Standard Deviation (%)</TableCell>
                    <TableCell size="small">{ task.taskErrorsStddev }</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell size="small">Task Path Deviation - Observed/Optimal (# of Steps)</TableCell>
                    <TableCell size="small">
                      { task.taskPathDeviationObserved }
                      {' '}
                      /
                      {' '}
                      { task.taskPathDeviationOptimal }
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
            <Box className={classes.fullWidthGridRow} id="participants">
              <ChplSedParticipantsEdit
                task={task}
              />
            </Box>
          </Box>
        </CardContent>
      </AccordionDetails>
    </Accordion>
  );
}

export default ChplSedTaskEdit;

ChplSedTaskEdit.propTypes = {
  task: object.isRequired,
};
