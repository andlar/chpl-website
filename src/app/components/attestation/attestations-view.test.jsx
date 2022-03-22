import React from 'react';
import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';
import { when } from 'jest-when';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import ChplAttestationsView from './attestations-view';

import * as angularReactHelper from 'services/angular-react-helper';
import { UserContext } from 'shared/contexts';

const DateUtilMock = {
  getDisplayDateFormat: jest.fn(),
};
angularReactHelper.getAngularService = jest.fn();
when(angularReactHelper.getAngularService).calledWith('DateUtil').mockReturnValue(DateUtilMock);

const hocMock = {
  dispatch: jest.fn(),
};

const developerMock = {
  name: 'a developer name',
  attestations: [],
};

const mockApi = {
  isLoading: true,
  data: {
    canSubmitAttestationChangeRequest: true,
  },
  mutate: () => {},
};

jest.mock('api/developer', () => ({
  __esModule: true,
  useFetchAttestations: () => mockApi,
  usePostAttestationException: () => mockApi,
}));

const mockEnqueue = jest.fn();

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: () => ({
    enqueueSnackbar: mockEnqueue,
  }),
}));

const userContextMock = {
  hasAnyRole: () => true,
  hasAuthorityOn: () => true,
};

describe('the ChplAttestationsView component', () => {
  beforeEach(async () => {
    render(
      <UserContext.Provider value={userContextMock}>
        <ChplAttestationsView
          developer={developerMock}
          dispatch={hocMock.dispatch}
        />
      </UserContext.Provider>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  describe('when creating an attestation change request', () => {
    it('should call the callback', async () => {
      userEvent.click(screen.getByRole('button', { name: /Submit Attestation/i }));

      await waitFor(() => {
        expect(hocMock.dispatch).toHaveBeenCalledWith('createAttestation');
      });
    });
  });
});
