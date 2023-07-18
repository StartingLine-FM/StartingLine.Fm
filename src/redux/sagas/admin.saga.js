import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

//Worker Saga: fired when adding a resource
function* postResource(action) {
    try {
        yield call(axios.post, '/api/admin', action.payload);
        yield put({ type: 'FETCH_RESOURCES'});
    } catch (error) {
        console.log('Error adding resource', error);
    }
};

//Worker Saga: fired when a resource is updated
function* putResource(action) {
    try {
        yield call(axios.put, '/api/admin/${action.payload.id}', action.payload);
        yield put({ type: 'FETCH_RESOURCES'});
    } catch (error) {
        console.log('Error updating resource', error);
    }
};

//Worker Saga: fired with a resource is deleted 
function* deleteResource(action) {
    try {
        yield call(axios.delete, '/api/admin/{action.payload}');
        yield put({ type: 'FETCH_RESOURCES'});
    } catch (error) {
        console.log('Error deleting resource', error);
    }
};

function* adminSaga() {
    yield takeLatest('POST_RESOURCE', postResource);
    yield takeLatest('UPDATE_RESOURCE', putResource);
    yield takeLatest('DELETE_RESOURCE', deleteResource);
}

export default adminSaga;