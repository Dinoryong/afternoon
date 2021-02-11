import { useMemo } from "react";
import { combineReducers, createStore } from "redux";

let store;

const loginInitialState = {
  isShown: false,
  autoLogin: 0,
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
        state.autoLogin = 1;
      } else {
        state.autoLogin = 2;
      }

      return {
        ...state,
        autoLogin: state.autoLogin,
      };
    case "AUTO_LOGIN_FALSE":
      state.autoLogin = 2;
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

const postInitialState = {
  postShown: false,
  toggleId: 0,
};

const postReducer = (state = initialState.post, action) => {
  switch (action.type) {
    case "TOGGLE_POST":
      return {
        ...state,
        postShown: !state.postShown,
        toggleId: action.toggleId,
      };
    default:
      return state;
  }
};

const userInitialState = {
  editShown: false,
  followShown: false,
};

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case "TOGGLE_EDIT":
      return {
        ...state,
        editShown: !state.editShown,
      };
    case "TOGGLE_FOLLOW":
      return {
        ...state,
        followShown: !state.followShown,
      };
    default:
      return state;
  }
};

const initialState = {
  login: loginInitialState,
  submit: submitInitialState,
  post: postInitialState,
  user: userInitialState,
};

const rootReducer = combineReducers({
  login: loginReducer,
  submit: submitReducer,
  post: postReducer,
  user: userReducer,
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
