import React from 'react';
import { bool, node } from 'prop-types';
import ReactGA from 'react-ga4';

import ApiWrapper from 'api/api-wrapper';
import BrowserWrapper from 'components/browser/browser-wrapper';
import CmsWrapper from 'components/cms-widget/cms-wrapper';
import CompareWrapper from 'components/compare-widget/compare-wrapper';
import FlagWrapper from 'api/flag-wrapper';
import { UserWrapper } from 'components/login';

function AppWrapper({ children, showQueryTools }) {
  ReactGA.initialize([
    {
      trackingId: 'G-7SZDMS75VC',
      gaOptions: {
        debug_mode: window.location.origin !== 'https://chpl-dev.healthit.gov',
      },
      gtagOptions: {
        debug_mode: window.location.origin !== 'https://chpl-dev.healthit.gov',
        trackingId: 'GTM-KC3FP96'
      },
    },
  ]);

  return (
    <UserWrapper>
      <ApiWrapper showQueryTools={showQueryTools}>
        <FlagWrapper>
          <CompareWrapper>
            <CmsWrapper>
              <BrowserWrapper>
                {children}
              </BrowserWrapper>
            </CmsWrapper>
          </CompareWrapper>
        </FlagWrapper>
      </ApiWrapper>
    </UserWrapper>
  );
}

export default AppWrapper;

AppWrapper.propTypes = {
  children: node.isRequired,
  showQueryTools: bool,
};

AppWrapper.defaultProps = {
  showQueryTools: true,
};
