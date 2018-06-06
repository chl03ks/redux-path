
import counter from './indexReducer';

const createStore = (reducer) => {
	let state;
	let listeners = [];

	const getState = () => state;

	const  dispatch = (action) => {
		state = reducer(state, action);
		listeners.forEach(listener => {
			listener();
		});
	};
	const subscribe = (listener) => {
		listeners.push(listener);
		return () => {
			listeners = listeners.filter((l) => l !== listener);
		};
	};

	dispatch({});

	return { getState, dispatch, subscribe };
};

const store = createStore(counter);

const render = () => {
	document.body.innerText = store.getState();
};

store.subscribe(render);
render();


document.addEventListener('click', () => {
	store.dispatch({ type: 'INCREMENT'});
});


export default counter;

