module.exports = [
  {
    listingId: '13A!.AA.04.8990.AQA.0A@.AA.A.20230729',
    expectedErrors: ['Applicable criteria is required for each QMS Standard',
      'The \'Accessibility Certified\' value is \'false\' but',
      'Mandatory Disclosures',
      'certification edition',
      'No certification date',
      'Testing Lab',
      ' Edition code is required and must be 2 characters in length', 
      'ICS code is required and must be 2 characters in length',
      'ONC-ATL code is required and must be 2 characters in length',
      'additional software code is required and must be 1 character in length',
      'certified date code is required and must be 6 characters in length',
      'does not match the code of the declared developer',
      'product code is required and must be 4 characters in length',
      'version code is required and must be 2 characters in length',
      '170.315 (g)(4) is required but was not found',
      '170.315 (g)(5) is required but was not found',
      'The CQM with CMS ID \'CMS2\' does not specify a version. A version is required.'
    ],
    expectedWarnings: ['An unrecognized character was found for ACB Certification ID'],
  },
  {
    listingId: '13.07.04.XXXX.AQA20.R2.01.4.230511',
    expectedErrors: ['name is required for each QMS Standard',
      'Accessibility Standard(s) are required',
      'The \'Accessibility Certified\' value is \'true\' but',
      'Certification date',
      'Developer city',
      'Developer contact email address',
      'Developer contact name',
      'Developer contact phone number',
      'state',
      'street address',
      'website',
      'zipcode',
      'Self developer value',
      'additional software code is required',
      'certification edition is required',
      'edition code 13',
      'product code is required',
      'unique id indicates the product does have ICS but',
      '170.315 (g)(4) is required but was not found',
      '170.315 (g)(5) is required but was not found',
      'A CQM was found with versions or criteria specified but is missing the required CMS ID.'
    ],
    expectedWarnings: [],
  },
  {
    listingId: '15.07.04.1234.AQA21.R2.00.0.200511',
    expectedErrors: ['170.315 (g)(3) is required but was not found.',
      '170.315 (g)(4) is required but was not found.',
      '170.315 (g)(5) is required but was not found.',
      'Age range 55 for participant ID01 is an invalid value.',
      'Assistive Technology Needs are required for participant ID01.',
      'Certification 170.315 (a)(1) requires at least one UCD process.',
      'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(1) is required but was not found.',
      'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(2) or 170.315 (d)(2) (Cures Update) is required but was not found.',
      'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(3) or 170.315 (d)(3) (Cures Update) is required but was not found.',
      'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(4) is required but was not found.',
      'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(5) is required but was not found.',
      'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(6) is required but was not found.',
      'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(7) is required but was not found.',
      'Computer Experience (in months) has an invalid value \'5.5\' for participant ID01. The field must be a whole number.',
      'Criteria 170.315 (a)(1) indicates additional software should not be present but some was found.',
      'Education level School for participant ID01 is an invalid value.',
      'Gender is required for participant ID01.',
      'Listing has not attested to (g)(3), but at least one criteria was found attesting to SED.',
      'No developer with the name \'New Developer\' was found in the system.',
      'Occupation is required for participant ID01.',
      'Privacy and Security Framework is required for certification 170.315 (a)(1).',
      'Product Experience (in months) has an invalid value \'C\' for participant ID01. The field must be a whole number.',
      'Professional Experience (in months) has an invalid value \'A\' for participant ID01. The field must be a whole number.',
      'The \'Accessibility Certified\' value is \'false\' but 1 Accessibility Standard(s) were found.',
      'The CHPL Product Number has a developer code of \'1234\' but the developer does not yet exist in the system. To indicate a new developer the CHPL Product Number should use the code \'XXXX\'.',
      'The ONC-ACB test� is not valid.', 'The product code is required and must be 4 characters in length containing only the characters A-Z, a-z, 0-9, and _.',
      'The test task A1.1 for criteria 170.315 (a)(1) requires a Task Rating Standard Deviation value.',
      'The test task A1.1 for criteria 170.315 (a)(1) requires at least 10 participants.',
      'The unique id indicates the product does not have additional software but some is specified in the upload file.',
      'CMS ID \'CMStest\' is not a valid.'
    ],
    expectedWarnings: ['An unrecognized character was found for ACB Name',
      'A non-integer numeric number was found in Test Task "A1.1" "Task Time Average" "80.7". The number has been rounded to "81"'
    ],
  },
  {
    listingId: '15.04.04.3007.AQA22.V1.00.0.200707',
    expectedErrors: ['QMS Standard(s) are required.',
      'Accessibility Standard(s) are required.',
      'ICS parent listings must reference existing listings in the CHPL',
      'ICS parents must not be specified but at least one was found',
      'ONC-ACB code',
      'ONC-ATL code',
      'developer code',
      'product code',
      '170.315 (g)(4) is required but was not found',
      '170.315 (g)(5) is required but was not found',
      'The CQM with CMS ID \'CMS72\' has an invalid version \'v19\'.'
    ],
    expectedWarnings: [],
  },
  {
    listingId: '15.04.04.1722.AQAU.V1.00.1.210607',
    expectedErrors: ['Clinical Quality Measurement CMS134 was found under Certification criterion 170.315 (c)(1), but the product does not attest to that criterion.',
      'Clinical Quality Measurement CMS134 was found under Certification criterion c3, but the product does not attest to that criterion.',
      'Clinical Quality Measurement CMS134 was found under Certification criterion d10, but the product does not attest to that criterion.',
      'API Documentation is required for certification 170.315 (g)(10).',
      'Certification 170.315 (a)(1) contains duplicate Test Procedure: \'ONC Test Method\'.',
      'Certification 170.315 (b)(1) (Cures Update) contains duplicate Test Data: Name \'ONC Test Method\'.',
      'Certification 170.315 (b)(1) (Cures Update) contains duplicate Test Tool: Name \'Edge Testing Tool\'.',
      'Criteria 170.315 (a)(1) contains an invalid test functionality \'(a)(1)(ii)123\'. It has been removed from the pending listing.',
      'Criteria 170.315 (b)(1) (Cures Update) contains a test standard \'test standard\' which does not exist for edition 2015.',
      'Criteria 170.315 (b)(1) (Cures Update) contains an invalid test tool \'test tool\'. It has been removed from the pending listing.',
      'Criteria 170.315 (d)(12) indicates additional software should be present but none was found.',
      'Export Documentation is required for certification 170.315 (b)(10).',
      'GAP cannot be set to True for 170.315 (f)(3)',
      'Must use Cures Update version of \'170.315 (d)(2)\' unless ICS, for Listings certified after 2020-06-30.',
      'Service Base URL List is required for certification 170.315 (g)(10).',
      'Test data version is required for certification 170.315 (b)(1) (Cures Update).',
      'The test task A1.2 for criteria 170.315 (a)(1) has an invalid Task Path Deviation Observed value \'I\'. This field must be a number.',
      'The test task A1.2 for criteria 170.315 (a)(1) has an invalid Task Path Deviation Optimal value \'J\'. This field must be a number.',
      'The test task A1.2 for criteria 170.315 (a)(1) has an invalid Task Success Average value \'G\'. This field must be a number.',
      'The test task A1.2 for criteria 170.315 (a)(1) has an invalid Task Success Standard Deviation value \'H\'. This field must be a number.',
      'The test task A1.2 for criteria 170.315 (a)(1) has an invalid Task Time Deviation Observed Average value \'M\'. This field must be a number.',
      'The test task A1.2 for criteria 170.315 (a)(1) has an invalid Task Time Deviation Optimal Average value \'N\'. This field must be a number.',
      'The test task A1.2 for criteria 170.315 (a)(1) has an invalid Task Time Standard Deviation value \'L\'. This field must be a number.',
      'The test task A1.2 for criteria 170.315 (a)(1) requires a description.',
      'The test task A1.2 for criteria 170.315 (a)(1) requires at least 10 participants.',
      'The value for Documentation Url in criteria 170.315 (d)(13) is not a valid URL.',
      'The value for Use Cases in criteria 170.315 (d)(13) is not a valid URL.'
    ],
    expectedWarnings: ['The test participant with unique ID \'ID02\' is never referenced in the listing and will be ignored.',
      'Certification 170.315 (a)(1) contains duplicate Test Functionality: Number \'(a)(1)(ii)\'. The duplicates have been removed.',
      'Certification 170.315 (b)(1) (Cures Update) contains duplicate Test Standard: Number \'170.207(i)\'. The duplicates have been removed.',
      'Certification 170.315 (d)(13) has a Use Case but no Attestation Answer.',
      'Test data \'test data\' is invalid for certification 170.315 (b)(1) (Cures Update). ONC Test Method will be used instead.'
    ],
  },
  {
    listingId: '15.04.04.1722.AQAU.V2.00.1.210607',
    expectedErrors: ['170.315 (g)(4) is required but was not found',
      '170.315 (g)(5) is required but was not found',
      '170.315 (g)(6) or 170.315 (g)(6) (Cures Update) is required but was not found',
      'Attesting to Criteria 170.315 (g)(10) requires that Criteria 170.315 (d)(1) must also be attested to',
      'Attesting to Criteria 170.315 (g)(10) requires that Criteria 170.315 (d)(2) or 170.315 (d)(2) (Cures Update) or 170.315 (d)(10) or 170.315 (d)(10) (Cures Update) must also be attested to',
      'Attesting to Criteria 170.315 (g)(10) requires that Criteria 170.315 (d)(9) must also be attested to',
      'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(1) is required but was not found',
      'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(2) or 170.315 (d)(2) (Cures Update) is required but was not found',
      'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(3) or 170.315 (d)(3) (Cures Update) is required but was not found.',
      'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(4) is required but was not found',
      'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(5) is required but was not found',
      'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(6) is required but was not found',
      'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(7) is required but was not found',
      'Certification criterion 170.315 (b)(*) was found so 170.315 (d)(1) is required but was not found',
      'Certification criterion 170.315 (b)(*) was found so 170.315 (d)(2) or 170.315 (d)(2) (Cures Update) is required but was not found',
      'Certification criterion 170.315 (b)(*) was found so 170.315 (d)(3) or 170.315 (d)(3) (Cures Update) is required but was not found',
      'Certification criterion 170.315 (b)(*) was found so 170.315 (d)(5) is required but was not found',
      'Certification criterion 170.315 (b)(*) was found so 170.315 (d)(6) is required but was not found',
      'Certification criterion 170.315 (b)(*) was found so 170.315 (d)(7) is required but was not found',
      'Certification criterion 170.315 (b)(*) was found so 170.315 (d)(8) is required but was not found',
      'Certification criterion 170.315 (f)(*) was found so 170.315 (d)(1) is required but was not found',
      'Certification criterion 170.315 (f)(*) was found so 170.315 (d)(2) or 170.315 (d)(2) (Cures Update) is required but was not found',
      'Certification criterion 170.315 (f)(*) was found so 170.315 (d)(3) or 170.315 (d)(3) (Cures Update) is required but was not found',
      'Certification criterion 170.315 (f)(*) was found so 170.315 (d)(7) is required but was not found',
      'Listing has attested to (g)(3), but no criteria were found attesting to SED.',
      'Service Base URL List is required for certification 170.315 (g)(10)'
    ],
    expectedWarnings: [],
  },
  {
    listingId: '15.04.04.1722.AQAU.V3.00.1.210607',
    expectedErrors: ['Certification criterion \'170.315 (c)(3) (Cures Update)\' was found but no matching Clinical Quality Measurement was found.',
      '170.315 (g)(4) is required but was not found', '170.315 (g)(5) is required but was not found',
      '170.315 (g)(6) or 170.315 (g)(6) (Cures Update) is required but was not found',
      'Attesting to Criteria 170.315 (c)(3) (Cures Update) requires that Criteria 170.315 (d)(12) must also be attested to',
      'Attesting to Criteria 170.315 (c)(3) (Cures Update) requires that Criteria 170.315 (d)(13) must also be attested to',
      'Attesting to Criteria 170.315 (e)(1) (Cures Update) requires that Criteria 170.315 (d)(12) must also be attested to',
      'Attesting to Criteria 170.315 (e)(1) (Cures Update) requires that Criteria 170.315 (d)(13) must also be attested to',
      'Attesting to Criteria 170.315 (h)(2) requires that Criteria 170.315 (d)(12) must also be attested to',
      'Attesting to Criteria 170.315 (h)(2) requires that Criteria 170.315 (d)(13) must also be attested to',
      'Certification criterion 170.315 (c)(*) was found so 170.315 (d)(1) is required but was not found',
      'Certification criterion 170.315 (c)(*) was found so 170.315 (d)(2) or 170.315 (d)(2) (Cures Update) is required but was not found',
      'Certification criterion 170.315 (c)(*) was found so 170.315 (d)(3) or 170.315 (d)(3) (Cures Update) is required but was not found',
      'Certification criterion 170.315 (c)(*) was found so 170.315 (d)(5) is required but was not found',
      'Certification criterion 170.315 (e)(1) (Cures Update) was found so 170.315 (d)(1) is required but was not found',
      'Certification criterion 170.315 (e)(1) (Cures Update) was found so 170.315 (d)(2) or 170.315 (d)(2) (Cures Update) is required but was not found',
      'Certification criterion 170.315 (e)(1) (Cures Update) was found so 170.315 (d)(3) or 170.315 (d)(3) (Cures Update) is required but was not found',
      'Certification criterion 170.315 (e)(1) (Cures Update) was found so 170.315 (d)(5) is required but was not found',
      'Certification criterion 170.315 (e)(1) (Cures Update) was found so 170.315 (d)(7) is required but was not found',
      'Certification criterion 170.315 (e)(1) (Cures Update) was found so 170.315 (d)(9) is required but was not found.',
      'Certification criterion 170.315 (h)(*) was found so 170.315 (d)(1) is required but was not found',
      'Certification criterion 170.315 (h)(*) was found so 170.315 (d)(2) or 170.315 (d)(2) (Cures Update) is required but was not found',
      'Certification criterion 170.315 (h)(*) was found so 170.315 (d)(3) or 170.315 (d)(3) (Cures Update) is required but was not found'
    ],
    expectedWarnings: [],
  },
  {
    listingId: '15.04.04.1722.AQAC.V1.00.1.210607',
    expectedErrors: ['Cannot select both 170.315 (b)(1) and 170.315 (b)(1) (Cures Update)',
      'Cannot select both 170.315 (b)(2) and 170.315 (b)(2) (Cures Update)',
      'Cannot select both 170.315 (b)(3) and 170.315 (b)(3) (Cures Update)',
      'Cannot select both 170.315 (b)(6) and 170.315 (b)(10)',
      'Cannot select both 170.315 (b)(7) and 170.315 (b)(7) (Cures Update)',
      'Cannot select both 170.315 (b)(8) and 170.315 (b)(8) (Cures Update)',
      'Cannot select both 170.315 (b)(9) and 170.315 (b)(9) (Cures Update)',
      'Cannot select both 170.315 (c)(3) and 170.315 (c)(3) (Cures Update)',
      'Cannot select both 170.315 (d)(10) and 170.315 (d)(10) (Cures Update)',
      'Cannot select both 170.315 (d)(2) and 170.315 (d)(2) (Cures Update)',
      'Cannot select both 170.315 (d)(3) and 170.315 (d)(3) (Cures Update)',
      'Cannot select both 170.315 (e)(1) and 170.315 (e)(1) (Cures Update)',
      'Cannot select both 170.315 (f)(5) and 170.315 (f)(5) (Cures Update)',
      'Cannot select both 170.315 (g)(6) and 170.315 (g)(6) (Cures Update)',
      'Cannot select both 170.315 (g)(8) and 170.315 (g)(10)',
      'Cannot select both 170.315 (g)(9) and 170.315 (g)(9) (Cures Update)',
      'Listing has attested to (g)(3), but no criteria were found attesting to SED.',
      'Must use Cures Update version of \'170.315 (b)(3)\' unless ICS, for Listings certified after 2020-01-01',
      'Must use Cures Update version of \'170.315 (d)(10)\' unless ICS, for Listings certified after 2020-06-30.',
      'Must use Cures Update version of \'170.315 (d)(2)\' unless ICS, for Listings certified after 2020-06-30.',
      'Must use Cures Update version of \'170.315 (d)(3)\' unless ICS, for Listings certified after 2020-06-30',
      'Service Base URL List is required for certification 170.315 (g)(10)',
      'Certification criterion \'170.315 (c)(1)\' was found but no matching Clinical Quality Measurement was found.',
      'Certification criterion \'170.315 (c)(2)\' was found but no matching Clinical Quality Measurement was found.',
      'Certification criterion \'170.315 (c)(3) (Cures Update)\' was found but no matching Clinical Quality Measurement was found.',
      'Certification criterion \'170.315 (c)(3)\' was found but no matching Clinical Quality Measurement was found.',
      'Certification criterion \'170.315 (c)(4)\' was found but no matching Clinical Quality Measurement was found.',
      'Listing has attested to (g)(1), but no measures have been successfully tested for (g)(1).',
      'Listing has attested to (g)(2), but no measures have been successfully tested for (g)(2).'
    ],
    expectedWarnings: [],
  },
  {
    listingId: '15.04.04.1722.MEA1.V1.00.1.210607',
    expectedErrors: ['170.315 (g)(3) is required but was not found.',
      'G1 Measure \'EP Stage 3\' was not found associated with 170.315 (e)(3).',
      'G2 Measure \'EP Stage 3\' was not found associated with 170.315 (e)(3).',
      'The G1 Measure: Electronic Prescribing: Eligible Professional for RT1 may not be referenced since this listing does not have ICS. The measure has been removed.',
      'The G1 Measure: Medication/Clinical Information Reconciliation: Eligible Professional for RT9 may not be referenced since this listing does not have ICS. The measure has been removed.',
      'The G1 Measure: Patient Care Record Exchange: Eligible Professional for RT7 may not be referenced since this listing does not have ICS. The measure has been removed.',
      'The G1 Measure: Patient Electronic Access: Eligible Professional for RT2 may not be referenced since this listing does not have ICS. The measure has been removed.',
      'The G2 Measure: Electronic Prescribing: Eligible Professional for RT1 may not be referenced since this listing does not have ICS. The measure has been removed.',
      'The G2 Measure: Medication/Clinical Information Reconciliation: Eligible Professional for RT9 may not be referenced since this listing does not have ICS. The measure has been removed.',
      'The G2 Measure: Patient Care Record Exchange: Eligible Professional for RT7 may not be referenced since this listing does not have ICS. The measure has been removed.',
      'The G2 Measure: Patient Electronic Access: Eligible Professional for RT2 may not be referenced since this listing does not have ICS. The measure has been removed.'
    ],
    expectedWarnings: [],
  },
];
