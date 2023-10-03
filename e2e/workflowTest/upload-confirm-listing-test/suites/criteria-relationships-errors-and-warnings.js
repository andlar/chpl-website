const suite = {
  description: 'with issues with criteria relationships',
  file: '../../../resources/listings/2015_CriteriaRelationships.csv',
  listings: [{
    listingId: '15.04.04.1722.CRT1.V1.00.1.230607',
    expectedErrors: [
      'The criterion 170.315 (g)(9) is unavailable for this listing.',
      'The criterion 170.315 (g)(8) is unavailable for this listing.',
      'The criterion 170.315 (g)(6) is unavailable for this listing.',
      'The criterion 170.315 (f)(5) is unavailable for this listing.',
      'The criterion 170.315 (e)(1) is unavailable for this listing.',
      'The criterion 170.315 (d)(3) is unavailable for this listing.',
      'The criterion 170.315 (d)(2) is unavailable for this listing.',
      'The criterion 170.315 (d)(10) is unavailable for this listing.',
      'The criterion 170.315 (c)(3) is unavailable for this listing.',
      'The criterion 170.315 (b)(9) is unavailable for this listing.',
      'The criterion 170.315 (b)(8) is unavailable for this listing.',
      'The criterion 170.315 (b)(7) is unavailable for this listing.',
      'The criterion 170.315 (b)(3) is unavailable for this listing.',
      'The criterion 170.315 (b)(2) is unavailable for this listing.',
      'The criterion 170.315 (b)(1) is unavailable for this listing.',
      'Listing has not attested to (g)(3), but at least one criteria was found attesting to SED.',
      'Cannot select both 170.315 (g)(9) and 170.315 (g)(9) (Cures Update).',
      'Cannot select both 170.315 (g)(8) and 170.315 (g)(10) (Cures Update).',
      'Cannot select both 170.315 (g)(6) and 170.315 (g)(6) (Cures Update).',
      'Cannot select both 170.315 (f)(5) and 170.315 (f)(5) (Cures Update).',
      'Cannot select both 170.315 (e)(1) and 170.315 (e)(1) (Cures Update).',
      'Cannot select both 170.315 (d)(3) and 170.315 (d)(3) (Cures Update).',
      'Cannot select both 170.315 (d)(2) and 170.315 (d)(2) (Cures Update).',
      'Cannot select both 170.315 (d)(10) and 170.315 (d)(10) (Cures Update).',
      'Cannot select both 170.315 (c)(3) and 170.315 (c)(3) (Cures Update).',
      'Cannot select both 170.315 (b)(9) and 170.315 (b)(9) (Cures Update).',
      'Cannot select both 170.315 (b)(8) and 170.315 (b)(8) (Cures Update).',
      'Cannot select both 170.315 (b)(7) and 170.315 (b)(7) (Cures Update).',
      'Cannot select both 170.315 (b)(6) and 170.315 (b)(10) (Cures Update).',
      'Cannot select both 170.315 (b)(3) and 170.315 (b)(3) (Cures Update).',
      'Cannot select both 170.315 (b)(2) and 170.315 (b)(2) (Cures Update).',
      'Cannot select both 170.315 (b)(1) and 170.315 (b)(1) (Cures Update).',
      '170.315 (g)(3) is required but was not found.',
    ],
    expectedWarnings: [
    ],
  }, {
    listingId: '15.04.04.1722.CRT2.V1.00.1.210607',
    expectedErrors: [
      'Certification criterion 170.315 (h)(*) was found so 170.315 (d)(3) (Cures Update) is required but was not found.',
      'Certification criterion 170.315 (h)(*) was found so 170.315 (d)(2) (Cures Update) is required but was not found.',
      'Certification criterion 170.315 (h)(*) was found so 170.315 (d)(1) is required but was not found.',
      'Certification criterion 170.315 (g)(7) or 170.315 (g)(9) (Cures Update) or 170.315 (g)(10) (Cures Update) was found so 170.315 (d)(9) is required but was not found.',
      'Certification criterion 170.315 (g)(7) or 170.315 (g)(9) (Cures Update) or 170.315 (g)(10) (Cures Update) was found so 170.315 (d)(2) (Cures Update) or 170.315 (d)(10) (Cures Update) is required but was not found.',
      'Certification criterion 170.315 (g)(7) or 170.315 (g)(9) (Cures Update) or 170.315 (g)(10) (Cures Update) was found so 170.315 (d)(1) is required but was not found.',
      'Certification criterion 170.315 (e)(1) (Cures Update) was found so 170.315 (d)(9) is required but was not found.',
      'Certification criterion 170.315 (e)(1) (Cures Update) was found so 170.315 (d)(7) is required but was not found.',
      'Certification criterion 170.315 (e)(1) (Cures Update) was found so 170.315 (d)(5) is required but was not found.',
      'Certification criterion 170.315 (e)(1) (Cures Update) was found so 170.315 (d)(3) (Cures Update) is required but was not found.',
      'Certification criterion 170.315 (e)(1) (Cures Update) was found so 170.315 (d)(2) (Cures Update) is required but was not found.',
      'Certification criterion 170.315 (e)(1) (Cures Update) was found so 170.315 (d)(1) is required but was not found.',
      'Certification criterion 170.315 (c)(*) was found so 170.315 (d)(5) is required but was not found.',
      'Certification criterion 170.315 (c)(*) was found so 170.315 (d)(3) (Cures Update) is required but was not found.',
      'Certification criterion 170.315 (c)(*) was found so 170.315 (d)(2) (Cures Update) is required but was not found.',
      'Certification criterion 170.315 (c)(*) was found so 170.315 (d)(1) is required but was not found.',
      'Attesting to Criteria 170.315 (h)(2) requires that Criteria 170.315 (d)(13) (Cures Update) must also be attested to.',
      'Attesting to Criteria 170.315 (h)(2) requires that Criteria 170.315 (d)(12) (Cures Update) must also be attested to.',
      'Attesting to Criteria 170.315 (g)(10) (Cures Update) requires that Criteria 170.315 (d)(13) (Cures Update) must also be attested to.',
      'Attesting to Criteria 170.315 (g)(10) (Cures Update) requires that Criteria 170.315 (d)(12) (Cures Update) must also be attested to.',
      'Attesting to Criteria 170.315 (c)(3) (Cures Update) requires that Criteria 170.315 (d)(13) (Cures Update) must also be attested to.',
      'Attesting to Criteria 170.315 (c)(3) (Cures Update) requires that Criteria 170.315 (d)(12) (Cures Update) must also be attested to.',
      'Attesting to Criteria 170.315 (e)(1) (Cures Update) requires that Criteria 170.315 (d)(13) (Cures Update) must also be attested to.',
      'Attesting to Criteria 170.315 (e)(1) (Cures Update) requires that Criteria 170.315 (d)(12) (Cures Update) must also be attested to.',
    ],
    expectedWarnings: [
    ],
  }, {
    listingId: '15.04.04.1722.CRT3.V2.00.1.210607',
    expectedErrors: [
      'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(1) is required but was not found.',
      'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(2) (Cures Update) is required but was not found.',
      'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(3) (Cures Update) is required but was not found.',
      'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(4) is required but was not found.',
      'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(5) is required but was not found.',
      'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(6) is required but was not found.',
      'Certification criterion 170.315 (a)(*) was found so 170.315 (d)(7) is required but was not found.',
      'Certification criterion 170.315 (b)(*) was found so 170.315 (d)(1) is required but was not found.',
      'Certification criterion 170.315 (b)(*) was found so 170.315 (d)(2) (Cures Update) is required but was not found.',
      'Certification criterion 170.315 (b)(*) was found so 170.315 (d)(3) (Cures Update) is required but was not found.',
      'Certification criterion 170.315 (b)(*) was found so 170.315 (d)(5) is required but was not found.',
      'Certification criterion 170.315 (b)(*) was found so 170.315 (d)(6) is required but was not found.',
      'Certification criterion 170.315 (b)(*) was found so 170.315 (d)(7) is required but was not found.',
      'Certification criterion 170.315 (b)(*) was found so 170.315 (d)(8) is required but was not found.',
      'Certification criterion 170.315 (f)(*) was found so 170.315 (d)(1) is required but was not found.',
      'Certification criterion 170.315 (f)(*) was found so 170.315 (d)(2) (Cures Update) is required but was not found.',
      'Certification criterion 170.315 (f)(*) was found so 170.315 (d)(3) (Cures Update) is required but was not found.',
      'Certification criterion 170.315 (f)(*) was found so 170.315 (d)(7) is required but was not found.',
      '170.315 (g)(6) (Cures Update) is required but was not found.',
    ],
    expectedWarnings: [
    ],
  }],
};

export default suite;
