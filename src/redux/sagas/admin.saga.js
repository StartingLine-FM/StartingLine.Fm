// Importing necessary functions and libraries
import { call, put, takeLatest } from 'redux-saga/effects'; // helper functions from redux-saga
import axios from 'axios'; // Promise based HTTP client

//Worker Saga: fired when adding a resource
//posts a new resource and fetches the updated list 
function* postResource(action) {
    try {
        //post request with new resource
        yield call(axios.post, '/api/admin', action.payload);
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
    } catch (error) {
        console.log('Error deleting resource', error);
    }
};

// Worker Saga: fired when 'FETCH_ORGANIZATIONS' action is dispatched
// It fetches the list of organizations from the server
function* fetchOrganizations() {
    try {
        // Sends a GET request to the server to fetch all organizations
        const response = yield call(axios.get, '/api/admin/organizations');
        // Dispatches 'SET_ORGANIZATIONS' action along with the fetched organizations
        yield put({ type: 'SET_ORGANIZATIONS', payload: response.data });
    } catch (error) {
        // If there is an error, log the error
        console.log('Error fetching organizations', error);
    }
};

// Worker Saga: fired when 'POST_ORGANIZATION' action is dispatched
// It posts a new ORGANIZATION to the server
function* postOrganization(action) {
    try {
        // Sends a POST request to the server to add a new ORGANIZATION
        yield call(axios.post, '/api/admin/organizations', action.payload);
        // Dispatches 'FETCH_ORGANIZATIONS' action to fetch the updated list of organizations
        yield put({ type: 'FETCH_ORGANIZATIONS' });
    } catch (error) {
        console.log('Error posting organization:', error);
    }
};

// Worker Saga: fired when 'UPDATE_ORGANIZATION' action is dispatched
// It updates an existing ORGANIZATION on the server
function* putOrganization(action) {
    try {
        // Sends a PUT request to the server to update an existing ORGANIZATION
        yield call(axios.put, `/api/admin/organizations/${action.payload.id}`, action.payload);
        // Dispatches 'FETCH_ORGANIZATIONS' action to fetch the updated list of organizations
        yield put({ type: 'FETCH_ORGANIZATIONS' });
    } catch (error) {
        console.log('Error updating organization', error);
    }
};

// Worker Saga: fired when 'DELETE_ORGANIZATION' action is dispatched
// It deletes an existing ORGANIZATION from the server
function* deleteOrganization(action) {
    try {
        // Sends a DELETE request to the server to remove an existing ORGANIZATION
        yield call(axios.delete, `/api/admin/organizations/${action.payload}`);
        // Dispatches 'FETCH_ORGANIZATIONS' action to fetch the updated list of organizations
        yield put({ type: 'FETCH_ORGANIZATIONS' });
    } catch (error) {
        console.log('Error deleting organization', error);
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

function* fetchEntrepreneur() {
    try {
        // Sends a GET request to the server to fetch all entrepreneur types
        const response = yield call(axios.get, '/api/admin/entrepreneur');
        // Dispatches 'SET_ENTREPRENEUR' action along with the fetched entrepreneur types
        yield put({ type: 'SET_ENTREPRENEUR', payload: response.data });
    } catch (error) {
        console.log('Error fetching entrepreneur', error);
    }
}

function* fetchSupport() {
    try {
        // Sends a GET request to the server to fetch all support types
        const response = yield call(axios.get, '/api/admin/support');
        // Dispatches 'SET_SUPPORT' action along with the fetched support types
        yield put({ type: 'SET_SUPPORT', payload: response.data });
    } catch (error) {
        console.log('Error fetching support', error);
    }
}

function* fetchFunding() {
    try {
        // Sends a GET request to the server to fetch all funding types
        const response = yield call(axios.get, '/api/admin/Funding');
        // Dispatches 'SET_FUNDING' action along with the fetched funding types
        yield put({ type: 'SET_FUNDING', payload: response.data });
    } catch (error) {
        console.log('Error fetching funding', error);
    }
}

// Watcher Saga: Fires when certain actions are dispatched
function* adminSaga() {
    // Take latest is a helper function provided by redux-saga
    // It forks a new 'postResource' task on each 'POST_RESOURCE' action and cancels any previous tasks started previously if it's still running
    yield takeLatest('POST_RESOURCE', postResource);
    yield takeLatest('UPDATE_RESOURCE', putResource);
    yield takeLatest('DELETE_RESOURCE', deleteResource);
    yield takeLatest('POST_ORGANIZATION', postOrganization);
    yield takeLatest('POST_STAGE', postStage);
    yield takeLatest('UPDATE_ORGANIZATION', putOrganization);
    yield takeLatest('UPDATE_STAGE', putStage);
    yield takeLatest('DELETE_ORGANIZATION', deleteOrganization);
    yield takeLatest('DELETE_STAGE', deleteStage);
    yield takeLatest('FETCH_ORGANIZATIONS', fetchOrganizations);
    yield takeLatest('FETCH_STAGES', fetchStages);
    yield takeLatest('FETCH_ENTREPRENEUR', fetchEntrepreneur);
    yield takeLatest('FETCH_SUPPORT', fetchSupport);
    yield takeLatest('FETCH_FUNDING', fetchFunding);
}

export default adminSaga;