import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import AppRouter from './routers/AppRouter';
import rootReducer from './reducers';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser } from './actions/loginActions';
import { logoutUser } from './actions/loginActions';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    const currentTime  = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser(history));
        window.location.href = '/login'
    }
}

ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>
  , document.getElementById('app'));
