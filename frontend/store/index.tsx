import { useMemo } from "react";
import { combineReducers, createStore } from "redux";

let store;

const baseInitialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
};

const loginInitialState = {
  isShown: false,
};

const initialState = {
  base: baseInitialState,
  login: loginInitialState,
};

const baseReducer = (state = initialState.base, action) => {
  switch (action.type) {
    case "TICK":
      return {
        ...state,
        lastUpdate: action.lastUpdate,
        light: !!action.light,
      };
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1,
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1,
      };
    case "RESET":
      return {
        ...state,
        count: state.count,
      };
    default:
      return state;
  }
};

const loginReducer = (state = initialState.login, action) => {
  switch (action.type) {
    case "TOGGLE":
      let isShown = state.isShown;
      return {
        ...state,
        isShown: !isShown,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  base: baseReducer,
  login: loginReducer,
});

function initStore(preloadedState = initialState) {
  return createStore(rootReducer, preloadedState);
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
