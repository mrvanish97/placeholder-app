import fetch from 'cross-fetch';

/**
 * Authentification
 */

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const AUTH_LOGOFF = 'AUTH_LOGOFF';

export const tryAuth = (authData) => ({
  type: AUTH_REQUEST,
  ...authData,
  timestamp: Date.now()
});

export const recieveAuth = (userJSON) => ({
  type: AUTH_SUCCESS,
  currentUserId: userJSON.body[0].id
});

export const failAuth = (authData, authError) => ({
  type: AUTH_FAILURE,
  ...authData,
  authError
});

export const logOff = (authData) => ({
  type: AUTH_LOGOFF,
  ...authData,
  timestamp: Date.now
});

/**
 * Fetching users
 */

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const INVALIDATE_USERS = 'INVALIDATE_USERS'
export const TOGGLE_USER_LIST_SELECTION = 'TOGGLE_USER_LIST_SELECTION';
export const TOGGLE_MULTIPLE_USER_LIST_SELECTION = 'TOGGLE_MULTIPLE_USER_LIST_SELECTION';

export const requestUsers = () => ({
  type: FETCH_USERS_REQUEST,
});

export const recieveUsers = (usersJSON) => ({
  type: FETCH_USERS_SUCCESS,
  usersList: [...usersJSON.data]
});

export const failureReciveUsers = (fetchUsersError) => ({
  type: FETCH_USERS_FAILURE,
  fetchUsersError
});

export const invalidateUsers = () => ({
  type: INVALIDATE_USERS
});

export const toggleUserListSelection = (userId) => ({
  type: TOGGLE_USER_LIST_SELECTION,
  userId
});

export const toggleMultipleUserListSelection = (mode) => ({
  type: TOGGLE_MULTIPLE_USER_LIST_SELECTION,
  mode
});

const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users';

const fetchUsers = () => (async dispath => {
  dispath(requestUsers());
  const response = await fetch(USERS_API_URL);
  const json = await response.json();
  return dispath(recieveUsers(json));
});

const shouldFetchUsers = (state) => {
  if (!state.usersList) {
    return true
  } else if (state.isUsersListFetching) {
    return false
  } else {
    return posts.didUsersListInvalidate
  }
}

export const fetchUsersIfNeeded = () => ((dispath, getState) => {
  if (shouldFetchUsers(getState())) {
    return dispath(fetchUsers());
  }
});

/**
 * Fetching user by ID
 */
const FETCH_USER_BY_ID_REQUEST = 'FETCH_USER_BY_ID_REQUEST';
const FETCH_USER_BY_ID_SUCCESS = 'FETCH_USER_BY_ID_SUCCESS';
const FETCH_USER_BY_ID_FAILURE = 'FETCH_USER_BY_ID_FAILURE';
const INVALIDATE_USER_BY_ID = 'INVALIDATE_USER_BY_ID';

export const requestUserById = (userId) => ({
  type: FETCH_USER_BY_ID_REQUEST,
  userId
});

export const recieveUserById = (userId, userJSON) => ({
  type: FETCH_USER_BY_ID_SUCCESS,
  userId,
  userList: userJSON.data
});

export const failureReciveUserById = (userId, error) => ({
  type: FETCH_USER_BY_ID_FAILURE,
  userId,
  error
});

export const invalidateUsers = (userId) => ({
  type: INVALIDATE_USER_BY_ID,
  userId
});