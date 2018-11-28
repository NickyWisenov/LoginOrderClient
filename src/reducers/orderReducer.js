import { GET_ORDERS, GET_FILTERED_ORDERS, GET_AFTER_DELETE } from '../actions/types';

const initialState = {
    orders: [],
    isEditing: false,
    orderToUpdate: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload
            }
        case GET_FILTERED_ORDERS:
            return {
                orders: action.payload
            }

        case GET_AFTER_DELETE:
            return {
                orders: action.payload
            }
        default:
            return state;
    }
}

