const todoListResourcesReducer = (state = [], action) => {
    switch (action.type) { // switch statement to handle use cases for the returns
        case "SET_TODO_LIST_RESOURCES":
            return [...action.payload]; // return a spread new array of the action data.
        case "POST_ANON_TODO_LIST":
            return [...state, action.payload]; 
        case "PUT_ANON_TODO_LIST":
            let putState = state.map(resource => {
                if (resource.id === action.payload.id) {
                    return {
                        ...resource,
                        notes: action.payload.notes,
                    }
                } else return resource
            })
            console.log(putState)
            return putState;
        case "DELETE_ANON_TODO_LIST":
            return state.filter(resource => resource.id !== action.payload)
        default:
            return state; // return the state
    }
}

export default todoListResourcesReducer;