import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux/store';
import { addZero } from '../../lib/utils';

import {
  selectUserEventsArray,
  loadUserEvents,
  UserEvent,
} from '../../redux/userEventReducer';

import './Calendar.css';


const mapState = (state: RootState) => ({
  events: selectUserEventsArray(state),
});

const mapDispatch = {
  loadUserEvents,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {}

const createDateKey = (date: Date) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  return `${addZero(year)}-${addZero(month)}-${addZero(day)}`;
};

const groupEventsByDay = (events: UserEvent[]) => {
  const groups: Record<string, UserEvent[]> = {};
  events.forEach((event) => {
    const dateStart = new Date(event.dateStart);
    const dateEnd = new Date(event.dateEnd);
  });
};

const Calendar: React.FC<Props> = ({events, loadUserEvents}) => {
  useEffect(() => {
    loadUserEvents();
  }, []);

  return (
    <div className={'calendar'}>
      <div className={'calendar-day'}>
        <div className={'calendar-day-label'}>
          <span>31 May 2020</span>
        </div>
        <div className={'calendar-events'}>
          <div className={'calendar-event'}>
            <div className={'calendar-event-info'}>
              <div className={'calendar-event-time'}>10:00:00</div>
              <div className={'calendar-event-title'}>Learning TypeScript</div>
            </div>
            <button className={'calendar-event-delete-button'}>&times;</button>
          </div>
        </div>
      </div>

      <div className={'calendar-day'}>
        <div className={'calendar-day-label'}>
          <span>31 May 2020</span>
        </div>
        <div className={'calendar-events'}>
          <div className={'calendar-event'}>
            <div className={'calendar-event-info'}>
              <div className={'calendar-event-time'}>10:00:00</div>
              <div className={'calendar-event-title'}>Learning TypeScript</div>
            </div>
            <button className={'calendar-event-delete-button'}>&times;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connector(Calendar);
