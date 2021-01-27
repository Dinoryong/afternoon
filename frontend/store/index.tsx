import { useMemo } from "react";
import { combineReducers, createStore } from "redux";
import { AUTO_LOGIN } from "../pages/api/user";

let store;

const baseInitialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
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

const loginInitialState = {
  isShown: false,
  autoLogin: false,
  loginState: false,
};

const loginReducer = (state = initialState.login, action) => {
  switch (action.type) {
    case "TOGGLE":
      return {
        ...state,
        isShown: !state.isShown,
      };
    case "AUTO_LOGIN_CHECK":
      const accountEmail = window.localStorage.getItem("accountEmail");
      const accountId = window.localStorage.getItem("accountId");
      const authToken = window.localStorage.getItem("authToken");

      if (accountEmail !== null && accountId !== null && authToken !== null) {
        state.autoLogin = true;
      } else {
        state.autoLogin = false;
      }

      return {
        ...state,
        autoLogin: state.autoLogin,
      };
    case "AUTO_LOGIN_FALSE":
      state.autoLogin = false;
      return {
        ...state,
        autoLogin: state.autoLogin,
      };
    case "LOGIN_STATE_TRUE":
      state.loginState = true;
      return {
        ...state,
        loginState: state.loginState,
      };
    case "LOGIN_STATE_FALSE":
      state.loginState = false;
      return {
        ...state,
        loginState: state.loginState,
      };
    default:
      return state;
  }
};

const submitInitialState = {
  submitShown: false,
};

const submitReducer = (state = initialState.submit, action) => {
  switch (action.type) {
    case "TOGGLE_SUBMIT":
      return { ...state, submitShown: !state.submitShown };
    default:
      return state;
  }
};

const initialState = {
  base: baseInitialState,
  login: loginInitialState,
  submit: submitInitialState,
};

const rootReducer = combineReducers({
  base: baseReducer,
  login: loginReducer,
  submit: submitReducer,
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
