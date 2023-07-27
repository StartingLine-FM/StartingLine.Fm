const todoListResourcesReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_TODO_LIST_RESOURCES":
            return [...action.payload];
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
            return state;
    }
}

export default todoListResourcesReducer;