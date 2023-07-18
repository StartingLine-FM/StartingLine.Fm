import axios from "axios";
import { takeEvery, put } from "@redux-saga/core/effects";
import queryString from "query-string";

export default function * searchSaga(){
    yield takeEvery("FETCH_SEARCH", fetchSearch);
}

function * fetchSearch(action){
    try {
        const queryParams = queryString.stringify(action.payload.query)
        const response = yield axios.get(`/api/search/?${queryParams}`);
        yield put({type: "SET_SEARCH", action: response.data});
    } catch (error) {
        console.log("Error on fetchSearch saga", error);
    }
}