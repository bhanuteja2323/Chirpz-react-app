import { call, put, all, fork, takeEvery } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";

import {
  fetchUsersSuccess,
  fetchUsersFailure,
  postSuccess,
  postFailure,
} from "./action";
import { FETCH_USERS_REQUEST, POST_REQUEST } from "./actionType";

function* fetchUsers(): Generator {
  try {
    const response: AxiosResponse = (yield call(
      axios.get,
      "http://localhost:4000/api/v1/posts?_sort=createdAt&_order=asc"
    )) as unknown as AxiosResponse;
    yield put(fetchUsersSuccess(response.data));
  } catch (error) {
    yield put(fetchUsersFailure(error));
  }
}
interface PostData {
  userName: string;
  caption: string;
  tags: string[];
  isVerified: boolean;
}

const allData: PostData[] = [];

const postAPI = async (data: PostData): Promise<PostData[]> => {
  const url = "http://localhost:4000/api/v1/posts";
  try {
    const response = await axios.post<PostData>(url, data);
    allData.unshift(response.data);
    return allData;
  } catch (error) {
    throw error;
  }
};

function* postRequestSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(postAPI, action.payload);
    yield put(postSuccess(response));
  } catch (error) {
    yield put(postFailure(error));
  }
}

function* watchFetchUsers(): Generator {
  yield takeEvery(FETCH_USERS_REQUEST, fetchUsers);
  yield takeEvery(POST_REQUEST, postRequestSaga);
}

function* rootSaga(): Generator {
  yield all([fork(watchFetchUsers)]);
}

export default rootSaga;
