import React, { useRef, useState, useEffect } from 'react';
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { start, stop, selectDateStart } from '../../redux/recorderReducer';

import './Recorder.css';

const Recorder = () => {
  const dispatch = useDispatch();
  const dateStart = useSelector(selectDateStart);
  const started = dateStart !== '';
  let interval = useRef<number>(0);
  const [, setCount] = useState<number>(0);

  const addZero = (x: number): string => {
    return x < 10 ? `0${x}` : `${x}`;
  };

  const handleClick = () => {
    if (started) {
        window.clearInterval(interval.current);
        dispatch(stop());
    } else {
      dispatch(start());
      interval.current = window.setInterval(() => {
        setCount((count) => count + 1);
      }, 1000);
    }
  };

  useEffect(() => {
    return () => {
      window.clearInterval(interval.current);
    };
  }, []);

  let seconds = started
    ? Math.round((Date.now() - new Date(dateStart).getTime()) / 1000)
    : 0;

  let hours = seconds ? Math.round(seconds / 3600) : 0;
  seconds -= hours * 3600;
  let minutes = seconds ? Math.round(seconds / 60) : 0;
  seconds -= minutes * 60;

  return (
    <div className={cx('recorder', { 'recorder-started': started })}>
      <button className={'recorder-record'} onClick={handleClick}>
        <span></span>
      </button>
      <div className={'recorder-counter'}>
        {addZero(hours)}:{addZero(minutes)}:{addZero(seconds)}
      </div>
    </div>
  );
};

export default Recorder;
