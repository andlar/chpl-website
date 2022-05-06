import React from 'react';
import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import ChplSystemTriggerCreate from './system-trigger-create';

const hocMock = {
  dispatch: jest.fn(),
};

const jobMock = {
  name: 'job name',
  email: 'name@example.com',
  cronSchedule: 'cron s',
  job: { name: 'job name' },
};

describe('the ChplSystemTriggerCreate component', () => {
  beforeEach(async () => {
    render(
      <ChplSystemTriggerCreate
        job={jobMock}
        dispatch={hocMock.dispatch}
      />,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('should have a header', async () => {
    expect(screen.getByText('Run Job: job name')).toBeInTheDocument();
  });

  describe('when interacting with a job', () => {
    it('should call the callback to schedule a job', async () => {
      userEvent.click(screen.getByRole('button', { name: /Save/i }));

      await waitFor(() => {
        expect(hocMock.dispatch).toHaveBeenCalledWith({
          action: 'save',
          payload: expect.objectContaining(jobMock),
        });
      });
    });
  });
});
