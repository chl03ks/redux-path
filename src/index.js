import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { createStore, combineReducers } from 'redux';
import Counter from './componets/Counter';
import CounterReducer from './componets/CounterReducer';

const appReducer = combineReducers({
  CounterReducer,
});

const store = createStore(appReducer);

const render = () => {
  ReactDOM.render(
    <Counter 
      value={store.getState()}
      onIncrement={() => store.dispatch({ type: 'INCREMENT'})}
      onDecrement={() => store.dispatch({ type: 'DECREMENT'})}
    />, 
  document.getElementById('root'));
}

store.subscribe(render);

render();

registerServiceWorker();
