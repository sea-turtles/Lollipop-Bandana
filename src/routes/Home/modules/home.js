
// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_DONE = 'LOGIN_DONE';

// ------------------------------------
// Actions
// ------------------------------------

export const loginStart = () => {
  localStorage.login = true;
  return {
    type: LOGIN_START
  };
};

export const loginDone = () => {
  return {
    type: LOGIN_DONE
  };
};

export const actions = {
  loginStart,
  loginDone
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_START]: (state, action) => {
    return Object.assign({}, state, {
      loginInProgress: true
    });
  },

  [LOGIN_DONE]: (state, action) => {
    return Object.assign({}, state, {
      loginInProgress: false
    });
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loginInProgress: false
};
export default function homeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
