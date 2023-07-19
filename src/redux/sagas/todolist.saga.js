// import axios for requests nad take lastest and put for sagas
import axios from "axios";
import { takeLatest, put, take } from "redux-saga/effects";

function* todolistSaga() {
    yield takeLatest('FETCH_TODO_LIST', fetchTodoList);
    yield takeLatest('POST_TODO_LIST', postTodoList);
    yield takeLatest('PUT_TODO_LIST', putTodoList);
    yield takeLatest('DELETE_TODO_LIST', deleteTodoListResource);
    yield takeLatest('CLEAR_TODO_LIST', clearTodoList);
    yield takeLatest('FETCH_TODO_LIST_RESOURCES', fetchResourceInformation)

}
// function to get the todo lists for the particular user
function* fetchTodoList() {
    try {
        const response = yield axios.get('/api/todo/'); // call to the backend
        console.log(response.data); // check the response data
        yield put({ type: 'SET_TODO_LIST' });
    } catch (error) {
        console.log('there was an error fetching the todo list', error);
    }
}

// function to add a resource to a todo list
function* postTodoList(action) {
    try {
        const response = yield axios.post(`/api/todo/${action.payload.resource_id}`); // call to the backend
        console.log(response.data); // check the response data 
    } catch (error) {
        console.log('there was an error posting a new resource', error)
    }
}

function* putTodoList(action) {
    try {
        const response = yield axios.put(`/api/todo/${action.payload.resource_id}`); // call to the backend
        console.log(response.data) // check the response data
        put({ type: "FETCH_TODO_LIST" });
    } catch (error) {
        console.log('there was an error in the put to do list saga', error)
    }
}
// delete for a particular resource
function* deleteTodoListResource() {
    try {
        const response = yield axios.delete(`/api/todo/resource/${action.payload.resource_id}`);
        console.log(response.data);
        put({ type: "FETCH_TODO_LIST" });
    } catch (error) {
        console.log('there was an error in deleting to do list resource saga', error);
    }
}

// clear a todo list
function* clearTodoList() {
    try {
        const response = yield axios.delete('/api/todo/');
        console.log(response.data);
        put({ type: "FETCH_TODO_LIST" });
    } catch (error) {
        console.log('there was an error clearing the todo list', error)
    }
}

function* fetchResourceInformation() {
    try {
        const response = yield axios.get('/api/todo/user/todolist/resources');
        console.log(response.data);
        put({ type: "SET_TODO_LIST_RESOURCES" });
    } catch (error) {
        console.log('there was an error grabbing the resource by the id', error)
    }
}




export default todolistSaga;