import { GET_ORDERS, GET_FILTERED_ORDERS, GET_AFTER_DELETE, EDIT_ORDER } from '../actions/types';

const initialState = {
    orders: [],
    orderToUpdate: null,
    isEditing: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload,
                isEditing: false,
                orderToUpdate: null
            }
        case GET_FILTERED_ORDERS:
            return {
                orders: action.payload
            }
        case GET_AFTER_DELETE:
            return {
                orders: action.payload
            }
        case EDIT_ORDER:
            return {
                ...state,
                orderToUpdate: action.payload,
                isEditing: true
            }
        default:
            return state;
    }
}

