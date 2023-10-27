import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  POST_REQUEST, POST_SUCCESS, POST_FAILURE
} from './actionType';

const initialState = {
  userList: [],
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        userList: action.payload,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      case POST_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case POST_SUCCESS:
        return {
          ...state,
          loading: false,
          userList: action.payload,
          error: null,
        };
      case POST_FAILURE:
        return {
          ...state,
          loading: false,
          userList: [],
          error: action.payload,
        };
    default:
      return state;
  }
};

export default userReducer;

