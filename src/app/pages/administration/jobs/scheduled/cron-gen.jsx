import React, { useEffect, useState } from 'react';
import { ReCron, Tab } from '@sbzen/re-cron';
import {
  func, string,
} from 'prop-types';

function ChplCronGen(props) {
  const { dispatch } = props;
  const [cron, setCron] = useState(props.value); // eslint-disable-line react/destructuring-assignment
  const [tabs, setTabs] = useState([Tab.MINUTES, Tab.HOURS, Tab.DAY, Tab.MONTH, Tab.YEAR]);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);

  useEffect(() => {
    if (props.value) {
      setCron(props.value);
      const parts = props.value.split(' ');
      setMinute(parts[1]);
      setHour(parts[2]);
    }
  }, [props.value]); // eslint-disable-line react/destructuring-assignment

  useEffect(() => {
    const updated = [Tab.MONTH, Tab.YEAR];
    if (!props.frequency || props.frequency === 'WEEKLY' || props.frequency === 'DAILY' || props.frequency === 'HOURLY') {
      updated.unshift(Tab.DAY);
    }
    if (!props.frequency || props.frequency === 'DAILY' || props.frequency === 'HOURLY') {
      // updated.unshift(Tab.HOURS);
    }
    if (!props.frequency || props.frequency === 'HOURLY') {
      // updated.unshift(Tab.MINUTES);
    }
    setTabs(updated);
  }, [props.frequency]); // eslint-disable-line react/destructuring-assignment

  const handleChange = (event) => {
    setCron(event);
    dispatch(event);
  };

  const handleHour = (event) => {
    const { value } = event.target;
    setHour(value);
    if (value.length > 0) {
      const parts = cron.split(' ');
      parts[2] = value;
      setCron(parts.join(' '));
    }
  };

  const handleMinute = (event) => {
    const { value } = event.target;
    setMinute(value);
    if (value.length > 0) {
      const parts = cron.split(' ');
      parts[1] = value;
      setCron(parts.join(' '));
    }
  };

  return (
    <>
      <div>
        Cron value:
        {' '}
        <code>{cron}</code>
      </div>
      <ReCron
        activeTab={Tab.DAY}
        value={cron}
        onChange={handleChange}
        cssClassPrefix="chpl-"
        tabs={tabs}
      />
      Minute:
      <input type="number" value={minute} onChange={handleMinute} min="0" max="59" />
      Hour:
      <input type="number" value={hour} onChange={handleHour} min="0" max="23" />
    </>
  );
}

export default ChplCronGen;

ChplCronGen.propTypes = {
  frequency: string,
  dispatch: func.isRequired,
  value: string.isRequired,
};

ChplCronGen.defaultProps = {
  frequency: '',
};
