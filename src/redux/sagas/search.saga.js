import axios from "axios";
import { takeEvery, put } from "@redux-saga/core/effects";
import queryString from "query-string";

export default function* searchSaga() {
    yield takeEvery("FETCH_SEARCH", fetchSearch);
}

function* fetchSearch(action) {
    try {
        // instantiate response variable
        let response;

        // sends default search if no action.payload
        if (action.payload) {
            // converts action.payload object into a query string
            const queryParams = queryString.stringify(action.payload.query);
            response = yield axios.get(`/api/search/?${queryParams}`, action.payload)
        } else {
            response = yield axios.get('/api/search/')
        }

        // console.log(response.data);
        // send data to search.reducer
        yield put({ type: "SET_SEARCH", payload: response.data });
    } catch (error) {
        console.log("Error on fetchSearch saga", error);
    }
}