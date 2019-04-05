import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_LOGOFF,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  INVALIDATE_USERS,
  TOGGLE_USER_LIST_SELECTION
} from "../actions";

// Auth

const authInitialState = {
  currentUserId: null,
  isAuthentificationInProcess: false,
  error: null
};

const loggedInUser = (state = authInitialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        isAuthentificationInProcess: true,
        error: null,
        currentUserId: null
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthentificationInProcess: false,
        error: null,
        currentUserId: action.currentUserId
      };
    case AUTH_FAILURE:
      return {
        ...state,
        isAuthentificationInProcess: false,
        error: action.authError,
        currentUserId: null
      };
    case AUTH_LOGOFF:
      return {
        ...state,
        isAuthentificationInProcess: false,
        error: null,
        currentUserId: null
      };
    default:
      return state;
  };
};

// Users List

const usersListInitialState = {
  isUsersListFetching: true,
  isMultiExpandable: false,
  didUsersListInvalidate: false,
  usersList: null,
  error: null
};

const usersList = (state = usersListInitialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        isUsersListFetching: true,
        didUsersListInvalidate: false
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        isUsersListFetching: false,
        didUsersListInvalidate: false,
        usersList: action.usersList
          .map(user => ({ ...user, isExpanded: user.id ===  })),
        error: null
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        isUsersListFetching: false,
        didUsersListInvalidate: false,
        error: action.fetchUsersError
      };
    case INVALIDATE_USERS:
      return {
        ...state,
        isUsersListFetching: false,
        didUsersListInvalidate: false
      };
    case TOGGLE_USER_LIST_SELECTION:
      return {
        ...state,
      };
  };
};