// import axios for requests nad take lastest and put for sagas
import axios from "axios";
import { takeLatest, put, select } from "redux-saga/effects";
import moment from "moment";

// function that runs the saga generator functions
function* todolistSaga() {
    yield takeLatest('POST_TODO_LIST', postTodoList);
    yield takeLatest('POST_ANON_TO_REGISTERED', postAnonToRegistered)
    yield takeLatest('PUT_TODO_LIST', putTodoList);
    yield takeLatest('DELETE_TODO_LIST_RESOURCE', deleteTodoListResource);
    yield takeLatest('CLEAR_TODO_LIST', clearTodoList);
    yield takeLatest('FETCH_TODO_LIST_RESOURCES', fetchResourceInformation)
    yield takeLatest('FETCH_TABLE_LISTS', fetchTableLists)
    yield takeLatest('POST_NEW_TITLE', postNewTitle)
    yield takeLatest('CLEAR_TODO_RESOURCES', clearTodoResources);
}

// function to clear resources
function* clearTodoResources() {
    try {
        // Simply set an empty array to clear the resources in the store
        yield put({ type: "SET_TODO_LIST_RESOURCES", payload: [] });
    } catch (error) {
        // log the error
        console.log('there was an error clearing the todo resources', error)
    }
}

// function to add a resource to a todo list
function* postTodoList(action) {
    try {
        // create the response for the post request 
        // sending the action payload in params and body
        const response = yield axios.post(`/api/todo/${action.payload.resource_id}/${action.payload.title_table_id}`, action.payload); // call to the backend
        console.log(response.data); // check the response data 
        yield put({ type: "FETCH_TODO_LIST_RESOURCES", payload: action.payload.title_table_id }) // send payload and update for the reducer
    } catch (error) {
        console.log('there was an error posting a new resource', error)
    }
}

function* putTodoList(action) {
    try {
        // create the response for the put 
        const response = yield axios.put(`/api/todo/${action.payload.id}/${action.payload.title_table_id}`, { todo_id: action.payload.todo_id, completed: action.payload.completed, notes: action.payload.notes }); // call to the backend
        console.log(response.data) // check the response data
        yield put({ type: "FETCH_TODO_LIST_RESOURCES", payload: action.payload.title_table_id }); // update reducer with the id of the table id
    } catch (error) {
        // log the error 
        console.log('there was an error in the put to do list saga', error)
    }
}
// delete for a particular resource
function* deleteTodoListResource(action) {
    try {
        // create response for the delete with params 
        const response = yield axios.delete(`/api/todo/resource/${action.payload.id}/${action.payload.title_table_id}`);
        console.log(response.data); // check the response data
        yield put({ type: "FETCH_TODO_LIST_RESOURCES", payload: action.payload.title_table_id }); // update reducer with the table id as payload
    } catch (error) {
        // log the error
        console.log('there was an error in deleting to do list resource saga', error);
    }
}

// clear a todo list
function* clearTodoList(action) {
    try {
        // create response for teh delete for a whole todo list with params
        const response = yield axios.delete(`/api/todo/${action.payload.title_table_id}`);
        console.log(response.data); // check the data 
        // Dispatch the action to clear the resources after successful deletion
        yield put({ type: "CLEAR_TODO_RESOURCES" });
        // now fetch the lists 
        yield put({ type: "FETCH_TABLE_LISTS" });
    } catch (error) {
        // log the error 
        console.log('there was an error clearing the todo list', error)
    }
}

function* fetchResourceInformation(action) {
    try {
        // create repsonse for the axios get to grab
        // resource information
        const response = yield axios.get(`/api/todo/user/todolist/resources/${action.payload}`);
        console.log("response is", response.data); // check the response data
        yield put({ type: "SET_TODO_LIST_RESOURCES", payload: response.data }); // update the reducer with the response data
    } catch (error) {
        // log the error
        console.log('there was an error grabbing the resource by the id', error)
    }
}


function* fetchTableLists(action) {
    try {
        // make request
        const response = yield axios.get('/api/todo/titles')
        console.log(response.data) // log the response
        yield put({ type: "SET_TABLE_LIST", payload: response.data }); // update the table list for the title ids
        if (action.payload) {

            const titles = yield select(store => store.tableListReducer)
            let title_table_id = titles[0].id
            let todo = action.payload


            for (let item of todo) {
                yield put({
                    type: "POST_TODO_LIST",
                    payload: {
                        resource_id: item.objectID,
                        title_table_id,
                        notes: item.notes
                    }
                })
            }
        }
    } catch (error) {
        // log the error if there is one
        console.log('there was an error fetching the table title lists', error)
    }
}

function* postNewTitle(action) {
    try {
        // make request
        const response = yield axios.post('api/todo/title', { title: action.payload.title })
        console.log(response.data) // make sure you are getting the correct data
        console.log("post new title action.payload:", action.payload);

        if (action.payload.todo) {
            console.log("sending to fetchTableLists:", action.payload.todo)
            yield put({ type: "FETCH_TABLE_LISTS", payload: action.payload.todo })
        } else yield put({ type: "FETCH_TABLE_LISTS" });
    } catch (error) {
        console.log('there was an error posting a new title', error)
    }
}

function* postAnonToRegistered(action) {
    try {

        let todo = action.payload

        // if the newly registered user had a todo list
        if (todo.length > 0) {

            let currentDate = moment().format("MM/DD/YYYY");

            yield put({
                type: "POST_NEW_TITLE",
                payload: {
                    title: `TO-DO: ${currentDate}`,
                    todo
                }
            })
        } else return;
    } catch (error) {
        console.log("Error posting new user's anon todo list", error);
    }
}

export default todolistSaga;