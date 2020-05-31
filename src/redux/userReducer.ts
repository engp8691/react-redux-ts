import { AnyAction } from "redux";

interface User {
    id: number,
    title: string,
    dateStart: string,
    dateEnd: string
}

// normalizing the data
interface UserState {
    byIds: Record<User['id'], User>,
    allIds: User['id'][]
}

const initialState: UserState = {
    byIds: {},
    allIds: []
}

const userReducer = (
    state: UserState = initialState,
    action: AnyAction
) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default userReducer;
