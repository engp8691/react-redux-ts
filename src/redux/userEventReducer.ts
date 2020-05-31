import { AnyAction, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "./store";

export interface UserEvent {
    id: number,
    title: string,
    dateStart: string,
    dateEnd: string
}

// normalizing the data
interface UserEventState {
    byIds: Record<UserEvent['id'], UserEvent>,
    allIds: UserEvent['id'][]
}

const LOAD_REQUEST = 'userEvents/load_request';
interface LoadRequestAction extends Action<typeof LOAD_REQUEST> {
}

const LOAD_SUCCESS = 'userEvents/load_success';
interface LoadSuccessAction extends Action<typeof LOAD_SUCCESS> {
    payload: {
        events: UserEvent[]
    }
}

const LOAD_FAILURE = 'userEvents/load_failure';
interface LoadFailueAction extends Action<typeof LOAD_FAILURE> {
    error: string
}

export const loadUserEvents = (): ThunkAction<
    void,
    RootState,
    undefined,
    LoadRequestAction | LoadSuccessAction | LoadFailueAction
> => async (dispatch, getState) => {
    dispatch({
        type: LOAD_REQUEST
    });
    try {
        const response = await fetch('http://localhost:3001/events');
        const events: UserEvent[] = await response.json();
        dispatch({
            type: LOAD_SUCCESS,
            payload: { events }
        });
    }
    catch (e) {
        dispatch({
            type: LOAD_FAILURE,
            error: "Failed to load events."
        })
    }
};

const selectUserEventsSate = (rootState: RootState) => rootState.userevents;

export const selectUserEventsArray = (rootState: RootState) => {
    const state = selectUserEventsSate(rootState);
    return state.allIds.map(id => state.byIds[id]);
}

const initialState: UserEventState = {
    byIds: {},
    allIds: []
}

const userEventReducer = (
    state: UserEventState = initialState,
    action: LoadSuccessAction | LoadRequestAction | LoadFailueAction
) => {
    switch (action.type) {
        case LOAD_SUCCESS:
            const { events } = action.payload;
            return {
                ...state,
                allids: events.map(({ id }) => id),
                byIds: events.reduce<UserEventState['byIds']>((byIds, event) => {
                    byIds[event.id] = event;
                    return byIds;
                }, {})
            };
        default:
            return state;
    }
}

export default userEventReducer;
