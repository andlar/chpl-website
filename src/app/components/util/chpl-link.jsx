import React, { useEffect, useState } from 'react';
import { bool, string } from 'prop-types';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { getAngularService } from 'services/angular-react-helper';
import { analyticsConfig, routerConfig } from 'shared/prop-types';
import {
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  chplLink: {
    display: 'flex',
    overflowWrap: 'anywhere',
    gap: '4px',
    justifyContent: 'space-between',
  },
  disclaimerIcon:{
    marginTop: '4px',
  },
});

const prependLink = (url) => {
  if (url.substring(0, 7) === 'http://' || url.substring(0, 8) === 'https://' || url.substring(0, 2) === '#/') {
    return url;
  }
  return `http://${url}`;
};

function ChplLink(props) {
  const {
    external,
    analytics,
    router,
  } = props;
  const classes = useStyles();
  const [href, setHref] = useState('');
  const [text, setText] = useState('');
  const $analytics = getAngularService('$analytics');
  const $state = getAngularService('$state');

  useEffect(() => {
    setHref(prependLink(props.href));
    setText(props.text || props.href);
  }, [props.href, props.text]); // eslint-disable-line react/destructuring-assignment

  let clicked = false;
  const track = (e) => {
    if (!clicked) {
      e.preventDefault();
      clicked = true;
      if (analytics.event) {
        $analytics.eventTrack(analytics.event, {
          category: analytics.category || null,
          label: analytics.label || null,
        });
      }
      if (router.sref) {
        $state.go(router.sref, router.options);
      } else {
        e.target.click();
      }
    }
  };

  let disclaimerClicked = false;
  const trackDisclaimer = (e) => {
    if (!disclaimerClicked) {
      e.preventDefault();
      disclaimerClicked = true;
      $analytics.eventTrack('Go to Website Disclaimers', {
        category: 'Navigation',
      });
      e.target.click();
    }
  };

  return (
      <div className={classes.chplLink}>
      <a href={href} onClick={track}>
        {text}
      </a>
      { external
        && (
          <a href="http://www.hhs.gov/disclaimer.html" onClick={trackDisclaimer} title="Web Site Disclaimers" className={classes.disclaimerIcon}>
          <ExitToAppIcon/>
          <span className="sr-only">Web Site Disclaimers</span>
        </a>
        )}
      </div>
  );
}

export default ChplLink;

ChplLink.propTypes = {
  text: string,
  href: string.isRequired,
  analytics: analyticsConfig,
  external: bool,
  router: routerConfig,
};

ChplLink.defaultProps = {
  text: '',
  analytics: {},
  external: true,
  router: {},
};
