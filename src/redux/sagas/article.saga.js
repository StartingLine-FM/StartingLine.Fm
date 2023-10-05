import axios from "axios";
import { takeEvery, put } from "@redux-saga/core/effects";

export default function* articleSaga() {
    yield takeEvery("FETCH_ARTICLES_LIST", fetchArticlesList);
    yield takeEvery("FETCH_ARTICLE_DETAIL", fetchArticleDetail);
    yield takeEvery("POST_ARTICLE", postArticle);
    yield takeEvery("PUT_ARTICLE", putArticle);
    yield takeEvery("DELETE_ARTICLE", deleteArticle);
};

// Fetches list of articles
function* fetchArticlesList() {
    try {
        let response = yield axios.get('/api/article/');
        yield put({ type: "SET_ARTICLES_LIST", payload: response.data });
    } catch (error) {
        console.log("Error on fetchArticlesList saga", error);
    }
};

// Fetches individual article for detail view
function* fetchArticleDetail(action) {
    try {
        console.log(action.payload)
        let response = yield axios.get(`/api/article/${action.payload.title}`);
        yield put({ type: "SET_ARTICLE_DETAIL", payload: response.data })
    } catch (error) {
        console.log("Error on fetchArticle saga", error);
    }
};

// Admin function to post a new article
function* postArticle(action) {
    try {
        yield axios.post('/api/article/', action.payload);
        yield put({ type: "FETCH_ARTICLES_LIST" });
    } catch (error) {
        console.log("Error on postArticle saga", error);
    }
};

// Admin function to edit an existing article
function* putArticle(action) {
    try {
        yield axios.put(`/api/article/${action.payload.id}`, action.payload);
        yield put({ type: "FETCH_ARTICLES_LIST" });
    } catch (error) {
        console.log("Error on putArticle saga", error);
    }
};

// Admin function to delete an article
function* deleteArticle(action) {
    try {
        yield axios.delete(`/api/article/${action.payload.id}`, action.payload);
        yield put({ type: "FETCH_ARTICLES_LIST" });
    } catch (error) {
        console.log("Error on deleteArticle saga", error);
    }
};