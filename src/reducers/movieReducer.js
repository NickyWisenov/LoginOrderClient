import { GET_MOVIES, GET_ORDERED } from '../actions/types';

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
        case GET_ORDERED:
            return {
                ...state,
                ordered: action.payload
            }
        default:
            return state;
    }
}