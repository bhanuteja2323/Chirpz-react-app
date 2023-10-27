import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS,FETCH_USERS_FAILURE,POST_REQUEST, POST_SUCCESS, POST_FAILURE } from './actionType';

export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (products: any) => ({
  type: FETCH_USERS_SUCCESS,
  payload: products,
});

export const fetchUsersFailure = (error: unknown) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});
export const postRequest = (data: any) => ({
  type: POST_REQUEST,
  payload: data,
});

export const postSuccess = (response: any) => ({
  type: POST_SUCCESS,
  payload: response,
});

export const postFailure = (error: any) => ({
  type: POST_FAILURE,
  payload: error,
});