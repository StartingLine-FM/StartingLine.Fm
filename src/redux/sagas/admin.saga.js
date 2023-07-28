import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

//Worker Saga: fired when adding a resource
//posts a new resource and fetches the updated list 
function* postResource(action) {
    try {
        //post request with new resource
        yield call(axios.post, '/api/admin', action.payload);
        //dispatch to fetch updated list
        yield put({ type: 'FETCH_SEARCH'});
    } catch (error) {
        console.log('Error adding resource', error);
    }
};

//Worker Saga: fired when a resource is updated
//updates a resource and fetches the updated list
function* putResource(action) {
    try {
        //sends a PUT request to the server to update a resource
        yield call(axios.put, `/api/admin/${action.payload.id}`, action.payload);
        //dispatches a fetch to get the updated list
        yield put({ type: 'FETCH_SEARCH'});
    } catch (error) {
        console.log('Error updating resource', error);
    }
};

//Worker Saga: fired with a resource is deleted 
//deletes resource and fetch the list with the resource now gone
function* deleteResource(action) {
    try {
        //sends a DELETE request to the server to delete a resource
        yield call(axios.delete, `/api/admin/${action.payload}`);
        //dispatches a fetch to get list without deleted resource
        yield put({ type: 'FETCH_SEARCH'});
    } catch (error) {
        console.log('Error deleting resource', error);
    }
};

function* fetchCategories() {
    try {
      const response = yield call(axios.get, '/api/admin/categories');
      yield put({ type: 'SET_CATEGORIES', payload: response.data });
    } catch (error) {
      console.log('Error fetching categories', error);
    }
  }

function* postCategory(action) {
    try {
        yield call(axios.post, '/api/admin/categories', action.payload);
        yield put({ type: 'FETCH_CATEGORIES '});
    } catch (error) {
        console.log('Error posting category:', error);
    }
};

function* fetchStages() {
    try {
      const response = yield call(axios.get, '/api/admin/stages');
      yield put({ type: 'SET_STAGES', payload: response.data });
    } catch (error) {
      console.log('Error fetching stages', error);
    }
  }

function* postStage(action) {
    try {
        yield call(axios.post, '/api/admin/stages', action.payload);
        yield put({ type: 'FETCH_STAGES '});
    } catch (error) {
        console.log('Error posting stage:', error);
    }
};

//watcher saga, that makes sure the actions are dispatched and tiggered correctly
function* adminSaga() {
    yield takeLatest('POST_RESOURCE', postResource);
    yield takeLatest('UPDATE_RESOURCE', putResource);
    yield takeLatest('DELETE_RESOURCE', deleteResource);
    yield takeLatest('POST_CATEGORY', postCategory);
    yield takeLatest('POST_STAGE', postStage);
    yield takeLatest('FETCH_CATEGORIES', fetchCategories);
    yield takeLatest('FETCH_STAGES', fetchStages);
}

export default adminSaga;