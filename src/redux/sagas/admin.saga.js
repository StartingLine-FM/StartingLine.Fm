import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

//Worker Saga: fired when adding a resource
function* addResource(action) {
    try {
        yield call(axios.post, '/api/admin', action.payload);
        yield put({ type: 'FETCH_RESOURCES'});
    } catch (error) {
        console.log('Error adding resource', error);
    }
};

function* updateResource(action) {
    try {
        yield call(axios.put, '/api/admin/${action.payload.id}', action.payload);
        yield put({ type: 'FETCH_RESOURCES'});
    } catch (error) {
        console.log('Error updating resource', error);
    }
};

function* deleteResource(action) {
    try {
        yield call(axios.delete, '/api/admin/{action.payload');
        yield put({ type: 'FETCH_RESOURCES'});
    } catch (error) {
        console.log('Error deleting resource', error);
    }
};

function* adminSaga() {
    yield takeLatest('ADD_RESOURCE', addResource);
    yield takeLatest('UPDATE_RESOURCE', updateResource);
    yield takeLatest('DELETE_RESOURCE', deleteResource);
}
