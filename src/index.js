/* eslint-disable prefer-template */
/* eslint-disable no-alert */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable radix */
import { createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import Board from './containers/board/Board';

import reducer from './store/reducer/reducer';


 const store = createStore(reducer,applyMiddleware(thunk));
 
ReactDOM.render(<Provider store = {store}><App />
</Provider> 
    ,document.getElementById('root'));


