import { get, post } from 'axios';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_SETTINGS = 'FETCH_SETTINGS';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const SEND_SETTINGS = 'SEND_SETTINGS';
export const POST_SETTINGS_DONE = 'POST_SETTINGS_DONE';

// ------------------------------------
// Actions
// ------------------------------------

export const fetchSettings = user => dispatch => {
  dispatch(getSettings(user));
  return {
    type: FETCH_SETTINGS
  };
};

export const updateSettings = settings => {
  return {
    type: UPDATE_SETTINGS,
    payload: settings
  };
};

export const sendSettings = data => dispatch => {
  dispatch(postSettings(data));
  return {
    type: SEND_SETTINGS,
    payload: data.settings
  };
};

export const postSettingsDone = () => {
  return {
    type: POST_SETTINGS_DONE
  };
};

export const getSettings = user => {
  return (dispatch, getState) => {
    // fetch settings from server and trigger UPDATE_SETTINGS action on response
    return get('/api/user', { params: { 'user_id': user['user_id'] } })
    .then(res => dispatch(updateSettings(res.data.settings)))
    .catch(console.log.bind(console));
  };
};

export const postSettings = data => {
  return (dispatch, getState) => {
    // post data to server and trigger POST_SETTINGS_DONE action on response
    return post('/api/user', data)
    .then(res => dispatch(postSettingsDone()))
    .catch(console.log.bind(console));
  };
};

export const actions = {
  fetchSettings,
  updateSettings,
  sendSettings,
  postSettingsDone,
  getSettings,
  postSettings
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_SETTINGS]: (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      settings: action.payload
    });
  },

  [FETCH_SETTINGS]: (state, action) => {
    return Object.assign({}, state, {
      isFetching: true
    });
  },

  [SEND_SETTINGS]: (state, action) => {
    return Object.assign({}, state, {
      isPosting: true,
      settings: action.payload
    });
  },

  [POST_SETTINGS_DONE]: (state, action) => {
    return Object.assign({}, state, {
      isPosting: false
    });
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  isPosting: false,
  settings: {} // start with empty settings
};
export default function dashboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
