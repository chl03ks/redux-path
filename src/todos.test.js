import deepFreeze from 'deep-freeze';
import todos from './reducers/todos';

it('Add a ToDo', () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  };

  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false,
    }
  ];
  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);

});

it('Toogle a ToDo', () => {
  const stateBefore = [{
      id: 0,
      text: 'Learn Redux',
      completed: false,
    },{
      id: 1,
      text: 'Go Shopping',
      completed: false,
    }];

  const action = {
    type: 'TOOGLE_TODO',
    id: 1,
  };

  const stateAfter = [{
      id: 0,
      text: 'Learn Redux',
      completed: false,
    },{
      id: 1,
      text: 'Go Shopping',
      completed: true,
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);

});
