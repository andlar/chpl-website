import React, { useEffect, useState } from 'react';
import {
  func,
} from 'prop-types';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import GroupIcon from '@material-ui/icons/Group';
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  ThemeProvider,
  Typography,
  makeStyles,
} from '@material-ui/core';

import { getAngularService } from '../../services/angular-react-helper';
import { ChplTooltip } from '../util';
import theme from '../../themes/theme';
import {
  user as userPropType,
} from '../../shared/prop-types';

const useStyles = makeStyles(() => ({
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },
}));

function ChplUserView(props) {
  /* eslint-disable react/destructuring-assignment */
  const [user, setUser] = useState({});
  const DateUtil = getAngularService('DateUtil');
  const canImpersonate = getAngularService('authService').canImpersonate(props.user);
  const classes = useStyles();
  /* eslint-enable react/destructuring-assignment */

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  const edit = () => {
    props.dispatch('edit', user);
  };

  const impersonate = () => {
    props.dispatch('impersonate', user);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card
        title={`${user.fullName} Information`}
      >
        <CardHeader
          title={user.fullName}
          subheader={user.friendlyName}
        />
        <CardContent className={classes.content}>
          <div>
            <Typography>
              {user.title
               && (
                 <>
                   <strong>Title:</strong>
                   {' '}
                   {user.title}
                 </>
               )}
            </Typography>
            <Typography>
              {user.phoneNumber
               && (
                 <>
                   <strong>Phone Number:</strong>
                   {' '}
                   {user.phoneNumber}
                 </>
               )}
            </Typography>
            <Typography>
              {user.email
               && (
                 <>
                   <strong>Email:</strong>
                   {' '}
                   {user.email}
                 </>
               )}
            </Typography>
            <Typography>
              {user.subjectName
               && (
                 <>
                   <strong>User Name:</strong>
                   {' '}
                   {user.subjectName}
                 </>
               )}
            </Typography>
            <Typography>
              {user.role
               && (
                 <>
                   <strong>Role:</strong>
                   {' '}
                   {user.role}
                 </>
               )}
            </Typography>
            <Typography>
              {user.organizations && user.organizations.length > 0
               && (
                 <>
                   <strong>Organization:</strong>
                   {' '}
                   {user.organizations.map((org) => (org.name)).join('; ')}
                 </>
               )}
            </Typography>
          </div>
          <div>
            <Typography>
              <strong>Last Login:</strong>
              {' '}
              {user.lastLoggedInDate ? DateUtil.timestampToString(user.lastLoggedInDate) : 'N/A'}
            </Typography>
            <Typography>
              <strong>Account Locked:</strong>
              {user.accountLocked
                ? <CheckBoxOutlinedIcon />
                : <CheckBoxOutlineBlankOutlinedIcon />}
            </Typography>
            <Typography>
              <strong>Account Enabled:</strong>
              { user.accountEnabled
                ? <CheckBoxOutlinedIcon />
                : <CheckBoxOutlineBlankOutlinedIcon />}
            </Typography>
            <Typography>
              <strong>Password change on next login:</strong>
              { user.passwordResetRequired
                ? <CheckBoxOutlinedIcon />
                : <CheckBoxOutlineBlankOutlinedIcon />}
            </Typography>
          </div>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <ButtonGroup
            color="primary"
          >
            <ChplTooltip title={`Edit ${user.fullName}`}>
              <Button
                variant="contained"
                aria-label={`Edit ${user.fullName}`}
                onClick={edit}
              >
                <EditOutlinedIcon />
              </Button>
            </ChplTooltip>
            { canImpersonate
              && (
                <ChplTooltip title={`Impersonate ${user.fullName}`}>
                  <Button
                    variant="outlined"
                    aria-label={`Impersonate ${user.fullName}`}
                    onClick={impersonate}
                  >
                    <GroupIcon />
                  </Button>
                </ChplTooltip>
              )}
          </ButtonGroup>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}

export default ChplUserView;

ChplUserView.propTypes = {
  user: userPropType.isRequired,
  dispatch: func,
};

ChplUserView.defaultProps = {
  dispatch: () => {},
};