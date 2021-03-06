import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../helper/is_empty';

const initialState = {
    isAuthenticated: false,
    user: {},
    locations: []
}

export default function (state = initialState, action) {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                locations: action.payload
            }
        default:
            return state;
    }
}