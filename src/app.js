import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import AppRouter from './routers/AppRouter';
import rootReducer from './reducers';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';


const store = createStore(
    rootReducer,
    compose(
    applyMiddleware(thunk),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    
)


ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>
  , document.getElementById('app'));
