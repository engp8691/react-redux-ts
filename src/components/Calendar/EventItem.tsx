import React, { useEffect, useRef, useState } from 'react';
import {
  UserEvent,
  deleteUserEvent,
  updateUserEvent,
} from '../../redux/userEventReducer';
import { useDispatch } from 'react-redux';

interface Props {
  event: UserEvent;
}

const EventItem: React.FC<Props> = ({ event }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(event.title);

  const handleDeleteClick = () => {
    dispatch(deleteUserEvent(event.id));
  };
  const [editable, setEditable] = React.useState(false);
  const handleTitleClick = () => {
    setEditable(true);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editable) {
      inputRef.current?.focus();
    }
  }, [editable]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBlur = () => {
    setEditable(false);
    dispatch(
      updateUserEvent({
        ...event,
        title,
      })
    );
  };

  return (
    <div className={'calendar-event'}>
      <div className={'calendar-event-info'}>
        <div className={'calendar-event-time'}>
          {event.dateStart} - {event.dateEnd}
        </div>
        <div className={'calendar-event-title'}>
          {editable ? (
            <input
              type={'text'}
              ref={inputRef}
              value={title}
              onChange={inputChangeHandler}
              onBlur={handleBlur}
            ></input>
          ) : (
            <span onClick={handleTitleClick}>{title}</span>
          )}
        </div>
      </div>
      <button
        className={'calendar-event-delete-button'}
        onClick={handleDeleteClick}
      >
        &times;
      </button>
    </div>
  );
};

export default EventItem;
