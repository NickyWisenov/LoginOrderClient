import axios from 'axios';
import { GET_ERRORS } from './types';


const apiUrl = 'http://127.0.0.1:4000/api/users';

export const userSignupRequest = ({username,password}) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/login`, {username,password})
      .then(response => {

      })
      .catch((err) => {
        dispatch({
                type: GET_ERRORS,
                payload: err.response.data
              });
      });
  };
};


