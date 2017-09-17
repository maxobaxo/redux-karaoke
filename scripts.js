const chorus = "Don't want to be a fool for you, Just another player in your game for two, You may hate me but it ain't no lie, Baby bye bye bye, Bye bye, I Don't want to make it tough, I just want to tell you that I've had enough, It might sound crazy but it ain't no lie, Baby bye bye bye"

const chorusArray = chorus.split(', ');
let position = 0;

const initialState = {
  chorusString: chorus,
  chorusArray: chorusArray,
  arrayPosition: position,
  currentPhrase: chorusArray[position]
}

console.log(initialState);

// REDUCER

const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case 'NEXT_LYRIC':
      let newPosition = state.arrayPosition + 1;
      newState = {
        chorusString: state.chorusString,
        chorusArray: state.chorusArray,
        arrayPosition: newPosition,
        currentPhrase: state.chorusArray[newPosition]
      }
      return newState;
    case 'RESTART_SONG':
      newState = {
        chorusString: state.chorusString,
        chorusArray: state.chorusArray,
        arrayPosition: 0,
        currentPhrase: state.chorusArray[0]
      }
      return newState;
    default:
      return state;
  }
}

const { expect } = window;

// UNIT TESTS

expect(
  reducer(initialState, { type: null })
).toEqual(initialState);

expect(
  reducer(initialState, { type: 'NEXT_LYRIC' })
).toEqual({
  chorusString: chorus,
  chorusArray: chorusArray,
  arrayPosition: 1,
  currentPhrase: chorusArray[1]
});

expect(
  reducer({
    chorusString: chorus,
    chorusArray: chorusArray,
    arrayPosition: 1,
    currentPhrase: chorusArray[1]
  }, { type: 'RESTART_SONG' })
).toEqual(initialState);

const { createStore } = Redux;
const store = createStore(reducer);
console.log(store.getState());

const render = () => {
  document.getElementById('words').innerHTML = store.getState().currentPhrase;
}

window.onload = function() {
  render();
}

const userClick = () => {
  const checkState = store.getState();
  if (checkState.arrayPosition === checkState.chorusArray.length - 1) {
    store.dispatch({ type: 'RESTART_SONG'});
  } else {
    store.dispatch({ type: 'NEXT LYRIC' })
  }
  store.dispatch({ type: 'NEXT_LYRIC' });
  console.log(store.getState());
  store.subscribe(render);
}
