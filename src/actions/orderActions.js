import axios from 'axios';
import { GET_MOVIES, GET_ERRORS,GET_ORDERED, GET_ORDERS, GET_FILTERED_ORDERS, GET_AFTER_DELETE, EDIT_ORDER, GET_EMPTY_ERRORS } from './types';
const apiUrl = 'http://127.0.0.1:4000/api/orders';

export const  getMovies = () => {
    return (dispatch) => {
        return axios.post(`${apiUrl}/getmovies`)
            .then(response => {
                dispatch(getMoviesList(response.data));
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
    };
}

export const getMoviesList = (response) => {
    return {
        type: GET_MOVIES,
        payload: response
    }
}

export const saveOrder = (history, orderData) => {
    return (dispatch) => {
        return axios.post(`${apiUrl}`, orderData)
            .then(response => {
                if (response.status == 200) {
                    history.push('/orderlist');
                    // dispatch(onOrdered(response));
                }
            })
            .catch(err => {
                console.log(err.response.data);
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            })
    }
}

export const onOrdered = (response) => {
    return {
        type: GET_ORDERED,
        payload: response.status
    }
}

export const getOrders = (userId) => {
    return (dispatch) => {
        return axios.get(`${apiUrl}/getOrders/` + userId)
        .then( response => {
            dispatch({
                type:GET_ORDERS,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type:GET_ERRORS,
                payload: err.response.data
            })
        })
    }
}

export const filterWeek = (orders) => {
    return (dispatch) => {
        // console.log(orders);
        dispatch({
            type: GET_FILTERED_ORDERS,
            payload: orders
        })
    }
}

export const deleteOrder = (orders_after_delete, order_id) => {
    return (dispatch) => {
        return axios.delete(`${apiUrl}/${order_id}`)
        .then( response => {
            if (response.data.result == "success") {
                dispatch({
                    type: GET_AFTER_DELETE,
                    payload: orders_after_delete
                })
            }
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: GET_ERRORS, 
                payload: err.response.data
            })
        })

    }
}

export const editOrder = (history, orderToUpdate) => {
    return (dispatch) => {
        history.push('/order');
        dispatch({
            type: EDIT_ORDER,
            payload: orderToUpdate
        })
    }
}

export const updateOrder = (history, orderId, orderData) => {
    return (dispatch) => {
        return axios.put(`${apiUrl}/${orderId}`, orderData)
            .then(response => {
                if (response.status == 200) {
                    history.push('/orderlist');
                }
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: GET_ERRORS, 
                    payload: err.response.data
                })
            })
    }
}

export const removeErrors = () => {
    return (dispatch) => {
        dispatch({
            type: GET_EMPTY_ERRORS,
            payload: {}
        })
    }
}
