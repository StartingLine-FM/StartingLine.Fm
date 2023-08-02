const todoListResourcesReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_TODO_LIST_RESOURCES":
            return [...action.payload];
        case "POST_ANON_TODO_LIST":
            // adds new to-do list item to state array
            return [...state, action.payload];
        case "PUT_ANON_TODO_LIST":
            // adds notes for to-do list item
            let putState = state.map(resource => {
                if (resource.id === action.payload.id) {
                    return {
                        ...resource,
                        notes: action.payload.notes,
                    }
                } else return resource
            })
            return putState;
        case "DELETE_ANON_TODO_LIST":
            // remove an item from state array
            return state.filter(resource => resource.id !== action.payload)
        default:
            return state;
    }
}

export default todoListResourcesReducer;