import axios from 'axios';
import { GET_MOVIES } from './types';

const apiUrl = 'http://127.0.0.1:4000/api/movies';

export const  getMovies = () => {
    return (dispatch) => {
        return axios.post(`${apiUrl}/getmovies`)
            .then(response => {
                dispatch(getMoviesList(response));
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