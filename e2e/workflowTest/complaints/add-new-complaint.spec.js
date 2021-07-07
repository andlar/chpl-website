import LoginComponent from '../../components/login/login.po';
import Hooks from '../../utilities/hooks';
import ComplaintsPage from '../../pages/surveillance/complaints/complaints.po';
import ComplaintsComponent from '../../components/surveillance/complaints/complaints.po';

let hooks;
let loginComponent;
let page;
let complaintsComponent;

beforeEach(async () => {
  loginComponent = new LoginComponent();
  hooks = new Hooks();
  page = new ComplaintsPage();
  complaintsComponent = new ComplaintsComponent();
  hooks.open('#/surveillance/complaints');
  await hooks.waitForSpinnerToDisappear();
});

describe('As ROLE_ACB user', () => {
  beforeEach(() => {
    loginComponent.logIn('drummond');
  });

  afterEach(() => {
    loginComponent.logOut();
  });

  it('should not be able to add new complaint without required fields', () => {
    page.addNewComplaint();
    hooks.waitForSpinnerToDisappear();
    complaintsComponent.saveComplaint();
    expect(complaintsComponent.fieldError('certification-body')).toBe('ONC-ACB is required');
    expect(complaintsComponent.fieldError('received-date')).toBe('Received Date is required');
    expect(complaintsComponent.fieldError('complainant-type')).toBe('Complainant Type is required');
    expect(complaintsComponent.fieldError('acb-complaint-id')).toBe('ONC-ACB Complaint ID is required');
    expect(complaintsComponent.fieldError('summary')).toBe('Complaint Summary is required');
  });

  it('should be able to add new complaint with required fields', () => {
    const timestamp = (new Date()).getTime();
    const fields = {
      body: 'Drummond Group',
      receivedDate: '06/23/2021',
      acbId: `Test - ${timestamp}`,
      type: 'Developer',
      summary: `Test Summary - ${timestamp}`,
    };
    page.addNewComplaint();
    hooks.waitForSpinnerToDisappear();
    complaintsComponent.set(fields);
    complaintsComponent.saveComplaint();
    hooks.waitForSpinnerToAppear();
    hooks.waitForSpinnerToDisappear();
    page.filter.addValue(fields.acbId);
    expect(page.getcellValue(1, 4)).toBe(fields.acbId);
  });
});
