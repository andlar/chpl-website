module.exports = [
  {
    listingId: '13A!.AA.04.8990.AQA.0A@.AA.A.20230729',
    expectedErrors: ['Applicable criteria is required for each QMS Standard', 'The \'Accessibility Certified\' value is \'false\' but', 'Mandatory Disclosures', 'certification edition', 'No certification date', 'Testing Lab', ' Edition code is required and must be 2 characters in length', 'ICS code is required and must be 2 characters in length', 'ONC-ATL code is required and must be 2 characters in length', 'additional software code is required and must be 1 character in length', 'certified date code is required and must be 6 characters in length', 'does not match the code of the declared developer', 'product code is required and must be 4 characters in length', 'version code is required and must be 2 characters in length', '170.315 (g)(4) is required but was not found', '170.315 (g)(5) is required but was not found'],
    expectedWarnings: ['An unrecognized character was found for ACB Certification ID'],
  },
  {
    listingId: '13.07.04.XXXX.AQA20.R2.01.4.230511',
    expectedErrors: ['name is required for each QMS Standard', 'Accessibility Standard(s) are required', 'The \'Accessibility Certified\' value is \'true\' but', 'Certification date', 'Developer city', 'Developer contact email address', 'Developer contact name', 'Developer contact phone number', 'state', 'street address', 'website', 'zipcode', 'Self developer value', 'additional software code is required', 'certification edition is required', 'edition code 13', 'product code is required', 'unique id indicates the product does have ICS but', '170.315 (g)(4) is required but was not found', '170.315 (g)(5) is required but was not found'],
    expectedWarnings: [],
  },
  {
    listingId: '15.07.04.1234.AQA21.R2.00.0.200511',
    expectedErrors: ['The \'Accessibility Certified\' value is \'false\' but', 'developer does not yet exist in the system', 'No developer with the name \'New Developer\' was found', 'product code is required and must be 4 characters in length', 'ONC-ACB test� is not valid.', '170.315 (g)(4) is required but was not found', '170.315 (g)(5) is required but was not found'],
    expectedWarnings: ['An unrecognized character was found for ACB Name'],
  },
  {
    listingId: '15.04.04.3007.AQA22.V1.00.0.200707',
    expectedErrors: ['QMS Standard(s) are required.', 'Accessibility Standard(s) are required.', 'ICS parent listings must reference existing listings in the CHPL', 'ICS parents must not be specified but at least one was found', 'ONC-ACB code', 'ONC-ATL code', 'developer code', 'product code', '170.315 (g)(4) is required but was not found', '170.315 (g)(5) is required but was not found'],
    expectedWarnings: [],
  },
  {
    listingId: '15.04.04.1722.AQAU.V1.00.1.210607',
    expectedErrors: ['API Documentation is required for certification 170.315 (g)(10)', 'Certification 170.315 (a)(1) contains duplicate Test Procedure', 'Certification 170.315 (b)(1) (Cures Update) contains duplicate Test Data', 'Certification 170.315 (b)(1) (Cures Update) contains duplicate Test Tool', 'Criteria 170.315 (a)(1) contains an invalid test functionality', 'Criteria 170.315 (b)(1) (Cures Update) contains a test standard \'test standard\' which does not exist for edition 2015', 'Criteria 170.315 (b)(1) (Cures Update) contains an invalid test tool \'test tool\'. It has been removed from the pending listing', 'Criteria 170.315 (d)(12) indicates additional software should be present but none was found', 'Export Documentation is required for certification 170.315 (b)(10)', 'GAP cannot be set to True for 170.315 (f)(3)', 'Listing has attested to (g)(3), but no criteria were found attesting to SED.', 'Must use Cures Update version of \'170.315 (d)(2)\' unless ICS, for Listings certified after 2020-06-30', 'Service Base URL List is required for certification 170.315 (g)(10)', 'Test data version is required for certification 170.315 (b)(1) (Cures Update)', 'The value for Documentation Url in criteria 170.315 (d)(13) is not a valid URL', 'The value for Use Cases in criteria 170.315 (d)(13) is not a valid URL'],
    expectedWarnings: ['Certification 170.315 (a)(1) contains duplicate Test Functionality: Number \'(a)(1)(ii)\'. The duplicates have been removed.', 'Certification 170.315 (b)(1) (Cures Update) contains duplicate Test Standard: Number \'170.207(i)\'. The duplicates have been removed.', 'Certification 170.315 (d)(13) has a Use Case but no Attestation Answer.', 'Test data \'test data\' is invalid for certification 170.315 (b)(1) (Cures Update). ONC Test Method will be used instead.'],
  },
  {
    listingId: '15.04.04.1722.AQAU.V2.00.1.210607',
    expectedErrors: ['170.315 (g)(4) is required but was not found', '170.315 (g)(5) is required but was not found', '170.315 (g)(6) or 170.315 (g)(6) (Cures Update) is required but was not found', 'Attesting to Criteria 170.315 (g)(10) requires that Criteria 170.315 (d)(1) must also be attested to', 'Attesting to Criteria 170.315 (g)(10) requires that Criteria 170.315 (d)(2) or 170.315 (d)(2) (Cures Update) or 170.315 (d)(10) or 170.315 (d)(10) (Cures Update) must also be attested to', 'Attesting to Criteria 170.315 (g)(10) requires that Criteria 170.315 (d)(9) must also be attested to', 'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(1) is required but was not found', 'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(2) or 170.315 (d)(2) (Cures Update) is required but was not found', 'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(3) or 170.315 (d)(3) (Cures Update) is required but was not found.', 'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(4) is required but was not found', 'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(5) is required but was not found', 'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(6) is required but was not found', 'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(7) is required but was not found', 'Certification criterion 170.315 (b)(*) was found so 170.315 (d)(1) is required but was not found', 'Certification criterion 170.315 (b)(*) was found so 170.315 (d)(2) or 170.315 (d)(2) (Cures Update) is required but was not found', 'Certification criterion 170.315 (b)(*) was found so 170.315 (d)(3) or 170.315 (d)(3) (Cures Update) is required but was not found', 'Certification criterion 170.315 (b)(*) was found so 170.315 (d)(5) is required but was not found', 'Certification criterion 170.315 (b)(*) was found so 170.315 (d)(6) is required but was not found', 'Certification criterion 170.315 (b)(*) was found so 170.315 (d)(7) is required but was not found', 'Certification criterion 170.315 (b)(*) was found so 170.315 (d)(8) is required but was not found', 'Certification criterion 170.315 (f)(*) was found so 170.315 (d)(1) is required but was not found', 'Certification criterion 170.315 (f)(*) was found so 170.315 (d)(2) or 170.315 (d)(2) (Cures Update) is required but was not found', 'Certification criterion 170.315 (f)(*) was found so 170.315 (d)(3) or 170.315 (d)(3) (Cures Update) is required but was not found', 'Certification criterion 170.315 (f)(*) was found so 170.315 (d)(7) is required but was not found', 'Listing has attested to (g)(3), but no criteria were found attesting to SED.', 'Service Base URL List is required for certification 170.315 (g)(10)'],
    expectedWarnings: [],
  },
  {
    listingId: '15.04.04.1722.AQAU.V3.00.1.210607',
    expectedErrors: ['170.315 (g)(4) is required but was not found', '170.315 (g)(5) is required but was not found', '170.315 (g)(6) or 170.315 (g)(6) (Cures Update) is required but was not found', 'Attesting to Criteria 170.315 (c)(3) (Cures Update) requires that Criteria 170.315 (d)(12) must also be attested to', 'Attesting to Criteria 170.315 (c)(3) (Cures Update) requires that Criteria 170.315 (d)(13) must also be attested to', 'Attesting to Criteria 170.315 (e)(1) (Cures Update) requires that Criteria 170.315 (d)(12) must also be attested to', 'Attesting to Criteria 170.315 (e)(1) (Cures Update) requires that Criteria 170.315 (d)(13) must also be attested to', 'Attesting to Criteria 170.315 (h)(2) requires that Criteria 170.315 (d)(12) must also be attested to', 'Attesting to Criteria 170.315 (h)(2) requires that Criteria 170.315 (d)(13) must also be attested to', 'Certification criterion 170.315 (c)(*) was found so 170.315 (d)(1) is required but was not found', 'Certification criterion 170.315 (c)(*) was found so 170.315 (d)(2) or 170.315 (d)(2) (Cures Update) is required but was not found', 'Certification criterion 170.315 (c)(*) was found so 170.315 (d)(3) or 170.315 (d)(3) (Cures Update) is required but was not found', 'Certification criterion 170.315 (c)(*) was found so 170.315 (d)(5) is required but was not found', 'Certification criterion 170.315 (e)(1) (Cures Update) was found so 170.315 (d)(1) is required but was not found', 'Certification criterion 170.315 (e)(1) (Cures Update) was found so 170.315 (d)(2) or 170.315 (d)(2) (Cures Update) is required but was not found', 'Certification criterion 170.315 (e)(1) (Cures Update) was found so 170.315 (d)(3) or 170.315 (d)(3) (Cures Update) is required but was not found', 'Certification criterion 170.315 (e)(1) (Cures Update) was found so 170.315 (d)(5) is required but was not found', 'Certification criterion 170.315 (e)(1) (Cures Update) was found so 170.315 (d)(7) is required but was not found', 'Certification criterion 170.315 (e)(1) (Cures Update) was found so 170.315 (d)(9) is required but was not found.', 'Certification criterion 170.315 (h)(*) was found so 170.315 (d)(1) is required but was not found', 'Certification criterion 170.315 (h)(*) was found so 170.315 (d)(2) or 170.315 (d)(2) (Cures Update) is required but was not found', 'Certification criterion 170.315 (h)(*) was found so 170.315 (d)(3) or 170.315 (d)(3) (Cures Update) is required but was not found'],
    expectedWarnings: [],
  },
  {
    listingId: '15.04.04.1722.AQAC.V1.00.1.210607',
    expectedErrors: ['Cannot select both 170.315 (b)(1) and 170.315 (b)(1) (Cures Update)', 'Cannot select both 170.315 (b)(2) and 170.315 (b)(2) (Cures Update)', 'Cannot select both 170.315 (b)(3) and 170.315 (b)(3) (Cures Update)', 'Cannot select both 170.315 (b)(6) and 170.315 (b)(10)', 'Cannot select both 170.315 (b)(7) and 170.315 (b)(7) (Cures Update)', 'Cannot select both 170.315 (b)(8) and 170.315 (b)(8) (Cures Update)', 'Cannot select both 170.315 (b)(9) and 170.315 (b)(9) (Cures Update)', 'Cannot select both 170.315 (c)(3) and 170.315 (c)(3) (Cures Update)', 'Cannot select both 170.315 (d)(10) and 170.315 (d)(10) (Cures Update)', 'Cannot select both 170.315 (d)(2) and 170.315 (d)(2) (Cures Update)', 'Cannot select both 170.315 (d)(3) and 170.315 (d)(3) (Cures Update)', 'Cannot select both 170.315 (e)(1) and 170.315 (e)(1) (Cures Update)', 'Cannot select both 170.315 (f)(5) and 170.315 (f)(5) (Cures Update)', 'Cannot select both 170.315 (g)(6) and 170.315 (g)(6) (Cures Update)', 'Cannot select both 170.315 (g)(8) and 170.315 (g)(10)', 'Cannot select both 170.315 (g)(9) and 170.315 (g)(9) (Cures Update)', 'Listing has attested to (g)(3), but no criteria were found attesting to SED.', 'Must use Cures Update version of \'170.315 (b)(3)\' unless ICS, for Listings certified after 2020-01-01', 'Must use Cures Update version of \'170.315 (d)(10)\' unless ICS, for Listings certified after 2020-06-30.', 'Must use Cures Update version of \'170.315 (d)(2)\' unless ICS, for Listings certified after 2020-06-30.', 'Must use Cures Update version of \'170.315 (d)(3)\' unless ICS, for Listings certified after 2020-06-30', 'Service Base URL List is required for certification 170.315 (g)(10)'],
    expectedWarnings: [],
  },
  {
    listingId: '15.04.04.1722.AQAS.SE.00.0.210607',
    expectedErrors: ['Age range 55 for participant ID01 is an invalid value.', 'Assistive Technology Needs are required for participant ID01.', 'Computer Experience (in months) has an invalid value \'5.5\' for participant ID01. The field must be a whole number.', 'Education level School for participant ID01 is an invalid value.', 'Gender is required for participant ID01.', 'Occupation is required for participant ID01.', 'Product Experience (in months) has an invalid value \'C\' for participant ID01. The field must be a whole number.', 'Professional Experience (in months) has an invalid value \'A\' for participant ID01. The field must be a whole number.', 'The test task T1.1 for criteria 170.315 (b)(3) requires a Task Errors Standard Deviation value.', 'The test task T1.1 for criteria 170.315 (b)(3) requires a Task Errors value.', 'The test task T1.1 for criteria 170.315 (b)(3) requires a Task Path Deviation Observed value.', 'The test task T1.1 for criteria 170.315 (b)(3) requires a Task Path Deviation Optimal value.', 'The test task T1.1 for criteria 170.315 (b)(3) requires a Task Rating Scale.', 'The test task T1.1 for criteria 170.315 (b)(3) requires a Task Rating Standard Deviation value.', 'The test task T1.1 for criteria 170.315 (b)(3) requires a Task Rating value.', 'The test task T1.1 for criteria 170.315 (b)(3) requires a Task Success Average value.', 'The test task T1.1 for criteria 170.315 (b)(3) requires a Task Success Standard Deviation value.', 'The test task T1.1 for criteria 170.315 (b)(3) requires a Task Time Average value.', 'The test task T1.1 for criteria 170.315 (b)(3) requires a Task Time Deviation Observed Average value.', 'The test task T1.1 for criteria 170.315 (b)(3) requires a Task Time Deviation Optimal Average value.', 'The test task T1.1 for criteria 170.315 (b)(3) requires a Task Time Standard Deviation value.', 'The test task T1.1 for criteria 170.315 (b)(3) requires a description.', 'The test task T1.1 for criteria 170.315 (b)(3) requires at least 10 participants.'],
    expectedWarnings: ['A non-integer numeric number was found in Test Task "A1.1" "Task Time Average" "80.7". The number has been rounded to "81".'],
  },
  {
    listingId: '15.04.04.1722.AQAS.S2.00.0.210607',
    expectedErrors: ['Assistive Technology Needs are required for participant ID01.', 'Product Experience (in months) has an invalid value \'C\' for participant ID01. The field must be a whole number.', 'The test task A1.2 for criteria 170.315 (a)(1) has an invalid Task Path Deviation Observed value \'I\'. This field must be a number.', 'The test task A1.2 for criteria 170.315 (a)(1) has an invalid Task Path Deviation Optimal value \'J\'. This field must be a number.', 'The test task A1.2 for criteria 170.315 (a)(1) has an invalid Task Success Average value \'G\'. This field must be a number.', 'The test task A1.2 for criteria 170.315 (a)(1) has an invalid Task Success Standard Deviation value \'H\'. This field must be a number.', 'The test task A1.2 for criteria 170.315 (a)(1) has an invalid Task Time Deviation Observed Average value \'M\'. This field must be a number.', 'The test task A1.2 for criteria 170.315 (a)(1) has an invalid Task Time Deviation Optimal Average value \'N\'. This field must be a number.', 'The test task A1.2 for criteria 170.315 (a)(1) has an invalid Task Time Standard Deviation value \'L\'. This field must be a number.', 'The test task A1.2 for criteria 170.315 (a)(1) requires a description.', 'The test task A1.2 for criteria 170.315 (a)(1) requires at least 10 participants.'],
    expectedWarnings: [],
  },
];
