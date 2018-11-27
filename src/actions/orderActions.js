import axios from 'axios';
import { GET_MOVIES, GET_ERRORS, ON_SUCCEED_ORDER } from './types';
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


export const saveOrder = (orderData) => {
    return (dispatch) => {
        return axios.post(`${apiUrl}`, orderData)
            .then(response => {
                if (response.status == 200) {
                    dispatch(orderedAction(response));
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

export const orderedAction = (response) => {
    return {
        type: ON_SUCCEED_ORDER, 
        payload: response.status
    }
}
export const getMoviesList = (response) => {
    return {
        type: GET_MOVIES,
        payload: response
    }
}
