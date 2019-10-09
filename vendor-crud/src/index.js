import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './_reducers';
//A linha segundo o tutorial está comentada
import { register } from './serviceWorker';
//import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
       <App />
    </Provider>
, document.getElementById('root'));

register();
//registerServiceWorker();
