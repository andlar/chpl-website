import React from 'react';
import { arrayOf, string } from 'prop-types';

import ChplChangeRequests from './change-requests';

import ApiWrapper from 'api/api-wrapper';
import FlagWrapper from 'api/flag-wrapper';
import { UserWrapper } from 'components/login';

function ChplChangeRequestsWrapper(props) {
  const {
    disallowedFilters,
    bonusQuery,
  } = props;

  return (
    <UserWrapper>
      <ApiWrapper>
        <FlagWrapper>
          <ChplChangeRequests
            disallowedFilters={disallowedFilters}
            bonusQuery={bonusQuery}
          />
        </FlagWrapper>
      </ApiWrapper>
    </UserWrapper>
  );
}

export default ChplChangeRequestsWrapper;

ChplChangeRequestsWrapper.propTypes = {
  disallowedFilters: arrayOf(string),
  bonusQuery: string,
};

ChplChangeRequestsWrapper.defaultProps = {
  disallowedFilters: [],
  bonusQuery: '',
};
