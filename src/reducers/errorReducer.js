import { GET_ERRORS, GET_EMPTY_ERRORS } from '../actions/types';

const initialState = {};

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_ERRORS:
            return action.payload;
        case GET_EMPTY_ERRORS:
            return action.payload;
        default: 
            return state;
    }
}
