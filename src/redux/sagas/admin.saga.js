// Importing necessary functions and libraries
import { call, put, takeLatest } from 'redux-saga/effects'; // helper functions from redux-saga
import axios from 'axios'; // Promise based HTTP client

//Worker Saga: fired when adding a resource
//posts a new resource and fetches the updated list 
function* postResource(action) {
    try {
        //post request with new resource
        yield call(axios.post, '/api/admin', action.payload);
        //dispatch to fetch updated list
        yield put({ type: 'FETCH_SEARCH' });
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
        yield put({ type: 'FETCH_SEARCH' });
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
        yield put({ type: 'FETCH_SEARCH' });
    } catch (error) {
        console.log('Error deleting resource', error);
    }
};

// Worker Saga: fired when 'FETCH_CATEGORIES' action is dispatched
// It fetches the list of categories from the server
function* fetchCategories() {
    try {
        // Sends a GET request to the server to fetch all categories
        const response = yield call(axios.get, '/api/admin/categories');
        // Dispatches 'SET_CATEGORIES' action along with the fetched categories
        yield put({ type: 'SET_CATEGORIES', payload: response.data });
    } catch (error) {
        // If there is an error, log the error
        console.log('Error fetching categories', error);
    }
};

// Worker Saga: fired when 'POST_CATEGORY' action is dispatched
// It posts a new category to the server
function* postCategory(action) {
    try {
        // Sends a POST request to the server to add a new category
        yield call(axios.post, '/api/admin/categories', action.payload);
        // Dispatches 'FETCH_CATEGORIES' action to fetch the updated list of categories
        yield put({ type: 'FETCH_CATEGORIES' });
    } catch (error) {
        console.log('Error posting category:', error);
    }
};

// Worker Saga: fired when 'UPDATE_CATEGORY' action is dispatched
// It updates an existing category on the server
function* putCategory(action) {
    try {
        // Sends a PUT request to the server to update an existing category
        yield call(axios.put, `/api/admin/categories/${action.payload.id}`, action.payload);
        // Dispatches 'FETCH_CATEGORIES' action to fetch the updated list of categories
        yield put({ type: 'FETCH_CATEGORIES' });
    } catch (error) {
        console.log('Error updating category', error);
    }
};

// Worker Saga: fired when 'DELETE_CATEGORY' action is dispatched
// It deletes an existing category from the server
function* deleteCategory(action) {
    try {
        // Sends a DELETE request to the server to remove an existing category
        yield call(axios.delete, `/api/admin/categories/${action.payload}`);
        // Dispatches 'FETCH_CATEGORIES' action to fetch the updated list of categories
        yield put({ type: 'FETCH_CATEGORIES' });
    } catch (error) {
        console.log('Error deleting category', error);
    }
};

// Worker Saga: fired when 'FETCH_STAGES' action is dispatched
// It fetches the list of stages from the server
function* fetchStages() {
    try {
        // Sends a GET request to the server to fetch all stages
        const response = yield call(axios.get, '/api/admin/stages');
        // Dispatches 'SET_STAGES' action along with the fetched stages
        yield put({ type: 'SET_STAGES', payload: response.data });
    } catch (error) {
        console.log('Error fetching stages', error);
    }
};

// Worker Saga: fired when 'POST_STAGE' action is dispatched
// It posts a new stage to the server
function* postStage(action) {
    try {
        // Sends a POST request to the server to add a new stage
        yield call(axios.post, '/api/admin/stages', action.payload);
        // Dispatches 'FETCH_STAGES' action to fetch the updated list of stages
        yield put({ type: 'FETCH_STAGES' });
    } catch (error) {
        console.log('Error posting stage:', error);
    }
};

// Worker Saga: fired when 'UPDATE_STAGE' action is dispatched
// It updates an existing stage on the server
function* putStage(action) {
    try {
        // Sends a PUT request to the server to update an existing stage
        yield call(axios.put, `/api/admin/stages/${action.payload.id}`, action.payload);
        // Dispatches 'FETCH_STAGES' action to fetch the updated list of stages
        yield put({ type: 'FETCH_STAGES' });
    } catch (error) {
        console.log('Error updating stage', error);
    }
};

// Worker Saga: fired when 'DELETE_STAGE' action is dispatched
// It deletes an existing stage from the server
function* deleteStage(action) {
    try {
        // Sends a DELETE request to the server to remove an existing stage
        yield call(axios.delete, `/api/admin/stages/${action.payload}`);
        // Dispatches 'FETCH_STAGES' action to fetch the updated list of stages
        yield put({ type: 'FETCH_STAGES' });
    } catch (error) {
        console.log('Error deleting stage', error);
    }
};

// Watcher Saga: Fires when certain actions are dispatched
function* adminSaga() {
    // Take latest is a helper function provided by redux-saga
    // It forks a new 'postResource' task on each 'POST_RESOURCE' action and cancels any previous tasks started previously if it's still running
    yield takeLatest('POST_RESOURCE', postResource);
    yield takeLatest('UPDATE_RESOURCE', putResource);
    yield takeLatest('DELETE_RESOURCE', deleteResource);
    yield takeLatest('POST_CATEGORY', postCategory);
    yield takeLatest('POST_STAGE', postStage);
    yield takeLatest('UPDATE_CATEGORY', putCategory);
    yield takeLatest('UPDATE_STAGE', putStage);
    yield takeLatest('DELETE_CATEGORY', deleteCategory);
    yield takeLatest('DELETE_STAGE', deleteStage);
    yield takeLatest('FETCH_CATEGORIES', fetchCategories);
    yield takeLatest('FETCH_STAGES', fetchStages);
}

export default adminSaga;