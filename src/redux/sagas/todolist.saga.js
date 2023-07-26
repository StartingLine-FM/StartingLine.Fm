// import axios for requests nad take lastest and put for sagas
import axios from "axios";
import { takeLatest, put, take } from "redux-saga/effects";

function* todolistSaga() {
    yield takeLatest('POST_TODO_LIST', postTodoList);
    yield takeLatest('PUT_TODO_LIST', putTodoList);
    yield takeLatest('DELETE_TODO_LIST', deleteTodoListResource);
    yield takeLatest('CLEAR_TODO_LIST', clearTodoList);
    yield takeLatest('FETCH_TODO_LIST_RESOURCES', fetchResourceInformation)
    yield takeLatest('FETCH_TABLE_LISTS', fetchTableLists)
    yield takeLatest('POST_NEW_TITLE', postNewTitle)
}

// function to get the todo lists for the particular user


// function to add a resource to a todo list
function* postTodoList(action) {
    try {
        const response = yield axios.post(`/api/todo/${action.payload.resource_id}/${action.payload.title_table_id}`); // call to the backend
        console.log(response.data); // check the response data 
        yield put({ type: "FETCH_TODO_LIST_RESOURCES", payload: title_table_id })
    } catch (error) {
        console.log('there was an error posting a new resource', error)
    }
}

function* putTodoList(action) {
    try {
        console.log(action.payload)
        const response = yield axios.put(`/api/todo/${action.payload.id}/${action.payload.title_table_id}`, {todo_id: action.payload.todo_id, completed: action.payload.completed, notes: action.payload.notes}); // call to the backend
        console.log(response.data) // check the response data
        yield put({ type: "FETCH_TODO_LIST_RESOURCES", payload: action.payload.title_table_id });
    } catch (error) {
        console.log('there was an error in the put to do list saga', error)
    }
}
// delete for a particular resource
function* deleteTodoListResource(action) {
    try {
        const response = yield axios.delete(`/api/todo/resource/${action.payload.id}/${action.payload.title_table_id}`);
        console.log(response.data);
        yield put({ type: "FETCH_TODO_LIST_RESOURCES" });
    } catch (error) {
        console.log('there was an error in deleting to do list resource saga', error);
    }
}

// clear a todo list
function* clearTodoList(action) {
    try {
        const response = yield axios.delete(`/api/todo/${action.payload.title_table_id}`);
        console.log(response.data);
        yield put({ type: "FETCH_TODO_LIST_RESOURCES" });
    } catch (error) {
        console.log('there was an error clearing the todo list', error)
    }
}

function* fetchResourceInformation(action) {
    try {
        console.log(action.payload)
        const response = yield axios.get(`/api/todo/user/todolist/resources/${action.payload}`);
        console.log("response is", response.data);
        yield put({ type: "SET_TODO_LIST_RESOURCES", payload: response.data });
    } catch (error) {
        console.log('there was an error grabbing the resource by the id', error)
    }
}

function* fetchTableLists() {
    try {
        // make request
        const response = yield axios.get('/api/todo/titles')
        console.log(response.data) // log the response
        yield put({ type: "SET_TABLE_LIST", payload: response.data });
    } catch (error) {
        console.log('there was an error fetching the table title lists', error)
    }
}

function* postNewTitle(action) {
    try {
        // make request
        const response = yield axios.post('api/todo/title', action.payload)
        console.log(response.data) // make sure you are getting the correct data
        yield put({ type: "FETCH_TABLE_LISTS" })
    } catch (error) {
        console.log('there was an error posting a new title', error)
    }
}


export default todolistSaga;