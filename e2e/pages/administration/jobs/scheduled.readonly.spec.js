import LoginComponent from '../../../components/login/login.sync.po';
import Hooks from '../../../utilities/hooks';

import ScheduledPage from './scheduled.po';

let hooks;
let login;
let page;

describe('the Scheduled Jobs page', () => {
  beforeEach(async () => {
    login = new LoginComponent();
    page = new ScheduledPage();
    hooks = new Hooks();
    await hooks.open('#/administration/jobs');
  });

  describe('for ROLE_ONC_STAFF', () => {
    beforeEach(() => {
      login.logIn('oncstaff');
      hooks.waitForSpinnerToDisappear();
    });

    afterEach(() => {
      login.logOut();
    });

    it('should have specific jobs', () => {
      const expected = [
        'All Broken Surveillance Rules Report',
        'Complaints Report Email',
        'Cures Statistics Email',
        'Developer Access Report',
        'Developer Attestations Check-in Report Email',
        'Developer Attestations Report Email',
        'ICS Errors Report',
        'Listing Validation Email Report',
        'ONC-ACB Questionable URL Report',
        'Overnight Broken Surveillance Rules Report',
        'Pending "Change Request" Report',
        'Questionable Activity Report',
        'Questionable URL Report',
        'Real World Testing Email Report',
        'Summary Statistics Email',
        'Trigger Developer Ban Notification',
      ];
      let jobs = page.getAvailableJobs();
      let errors = [];

      expected.forEach((exp) => {
        if (jobs.includes(exp)) {
          jobs = jobs.filter((job) => job !== exp);
        } else {
          errors.push(`Did not find job: ${exp}`);
        }
      });
      if (jobs.length > 0) {
        errors = errors.concat(jobs.map((job) => `Found unexpected job: ${job}`));
      }
      expect(errors.length).toBe(0, errors.join(';'));
    });

    it('should show Retired ONC-ACBs are retired on the scheduling page', () => {
      page.startSchedulingAJob('All Broken Surveillance Rules Report');
      const acbs = page.getAvailableAcbs();
      expect(acbs.find((acb) => acb.startsWith('UL LLC')).toLowerCase()).toBe('UL LLC (Retired)'.toLowerCase());
    });
  });
});
