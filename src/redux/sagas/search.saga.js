import axios from "axios";
import { takeEvery, put } from "@redux-saga/core/effects";
import queryString from "query-string";

export default function* searchSaga() {
  yield takeEvery("FETCH_SEARCH", fetchSearch);
}

function* fetchSearch(action) {
  try {
    console.log("in fetchSearch");
    let response;

    if (action.payload) {
      const queryParams = queryString.stringify(action.payload.query);
      response = yield axios.get(`/api/search/?${queryParams}`);
    } else {
      response = yield axios.get('/api/search/');
    }

    console.log(response.data);
    yield put({ type: "SET_SEARCH", payload: response.data });
  } catch (error) {
    console.log("Error on fetchSearch saga", error);
  }
}
