import { post } from 'axios';

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_SEARCH_CRITERIA = 'UPDATE_SEARCH_CRITERIA';
export const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS';
export const UPDATE_SEARCH_RESULTS = 'UPDATE_SEARCH_RESULTS';

// ------------------------------------
// Actions
// ------------------------------------

export const updateSearchCriteria = data => dispatch => {
  // trigger getSearchResults and update searchCriteria in state
  dispatch(getSearchResults(data));
  return {
    type: UPDATE_SEARCH_CRITERIA,
    payload: data
  };
};

export const getSearchResults = searchCriteria => {
  return (dispatch, getState) => {
    // fetch search from server and trigger UPDATE_SEARCH_RESULTS action on response
    return post('/api/search', searchCriteria)
    .then(res => dispatch(updateSearchResults(res.data)))
    .catch(console.log.bind(console));
  };
};

export const updateSearchResults = data => {
  return {
    type: UPDATE_SEARCH_RESULTS,
    payload: data
  };
};

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */

// export const doubleAsync = () => {
//   return (dispatch, getState) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         dispatch(increment(getState().counter));
//         resolve();
//       }, 200);
//     });
//   };
// };

export const actions = {
  updateSearchCriteria,
  updateSearchResults,
  getSearchResults
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_SEARCH_CRITERIA]: (state, action) => {
    return Object.assign({}, state, {
      searchCriteria: action.payload
    });
  },

  [UPDATE_SEARCH_RESULTS]: (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      searchResults: action.payload
    });
  },

  [GET_SEARCH_RESULTS]: (state, action) => {
    return Object.assign({}, state, {
      isFetching: true
    });
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  searchCriteria: {}, // start with empty search criteria
  searchResults: [] // start with empty search results
};
export default function dashboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
