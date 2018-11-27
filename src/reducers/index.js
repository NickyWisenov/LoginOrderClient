
import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import movieReducer from './movieReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    movies: movieReducer,
});