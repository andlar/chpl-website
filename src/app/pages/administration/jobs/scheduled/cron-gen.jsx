import React, { useEffect, useState } from 'react';
import { ReCron, Tab } from '@sbzen/re-cron';
import {
  func, string,
} from 'prop-types';

function ChplCronGen(props) {
  const { dispatch } = props;
  const [cron, setCron] = useState(props.value); // eslint-disable-line react/destructuring-assignment

  useEffect(() => {
    if (props.value) {
      setCron(props.value);
    }
  }, [props.value]); // eslint-disable-line react/destructuring-assignment

  const handleChange = (event) => {
    setCron(event);
    dispatch(event);
  };

  return (
    <>
      <div>
        Cron value:
        {' ' }
        <code>{cron}</code>
      </div>
      <ReCron
        value={cron}
        onChange={handleChange}
        cssClassPrefix="chpl-"
        tabs={[Tab.MINUTES, Tab.HOURS, Tab.DAY, Tab.MONTH, Tab.YEAR]}
      />
    </>
  );
}

export default ChplCronGen;

ChplCronGen.propTypes = {
  dispatch: func.isRequired,
  value: string.isRequired,
};
