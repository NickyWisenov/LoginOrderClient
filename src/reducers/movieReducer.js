import { GET_MOVIES, ON_SUCCEED_ORDER } from '../actions/types';

const initialState = {
    movies: [],
    ordered: false
}

export default function ( state = initialState, action ) {
    switch (action.type) {
        case GET_MOVIES:
            return {
                ...state,
                movies: action.payload
            }
        case ON_SUCCEED_ORDER:
            return {
                ...state,
                ordered: true
            }
        default:
            return state;
    }
}