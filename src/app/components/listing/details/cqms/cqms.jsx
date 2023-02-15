import React, { useEffect, useState } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { arrayOf, bool } from 'prop-types';

import { ChplTooltip } from 'components/util';
import { sortCqms } from 'services/cqms.service';
import {
  certificationEdition,
  cqm as cqmType,
} from 'shared/prop-types';

const useStyles = makeStyles({
  cqmHelperText: {
    padding: '16px 0',
  },
});

function ChplCqms(props) {
  const { cqms, edition } = props;
  const [viewAll, setViewAll] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setViewAll(props.viewAll);
  }, [props.viewAll]); // eslint-disable-line react/destructuring-assignment

  const getCriteriaCells = (cqm) => [1, 2, 3, 4].map((num) => {
    const meets = cqm.criteria.find((crit) => crit.certificationNumber === `170.315 (c)(${num})`);
    return (
      <TableCell key={num}>
        <span className="sr-only">
          { meets ? 'meets' : 'does not meet' }
          170.315 (c)(
          {num}
          )
        </span>
        { meets ? <CheckIcon fontSize="large" /> : <NotInterestedIcon color="disabled" fontSize="large" /> }
      </TableCell>
    );
  });

  return (
    <>
      <Typography className={classes.cqmHelperText}>
        Note 170.315 (c)(3) has two versions due to 2015 Cures Update, so please check the criterion in the “Certification Criteria” section above to determine which version applies here.
      </Typography>
      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{ edition.name === '2011' ? 'Meets' : 'Version' }</TableCell>
              <TableCell>Quality Measure</TableCell>
              { edition.name === '2015'
              && (
                <>
                  <TableCell>170.315 (c)(1)</TableCell>
                  <TableCell>170.315 (c)(2)</TableCell>
                  <TableCell>170.315 (c)(3)</TableCell>
                  <TableCell>170.315 (c)(4)</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            { cqms.filter((cqm) => viewAll || cqm.success)
              .sort(sortCqms)
              .map((cqm) => (
                <TableRow key={cqm.id ?? cqm.cmsId}>
                  <TableCell>
                    <span className="sr-only">{ cqm.success ? 'meets' : 'does not meet' }</span>
                    { edition.name === '2011' && cqm.success
                    && (
                      <CheckIcon fontSize="large" />
                    )}
                    { cqm.successVersions?.length > 0 && cqm.successVersions.join(', ') }
                    { !cqm.success
                    && (
                      <NotInterestedIcon fontSize="large" />
                    )}
                  </TableCell>
                  <TableCell>
                    <ChplTooltip title={cqm.description}>
                      <Typography>
                        { cqm.cmsId ? cqm.cmsId : `NQF-${cqm.nqfNumber}` }
                        :
                        {' '}
                        { cqm.title}
                      </Typography>
                    </ChplTooltip>
                  </TableCell>
                  { edition.name === '2015' && getCriteriaCells(cqm) }
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}

export default ChplCqms;

ChplCqms.propTypes = {
  cqms: arrayOf(cqmType).isRequired,
  edition: certificationEdition.isRequired,
  viewAll: bool.isRequired,
};
