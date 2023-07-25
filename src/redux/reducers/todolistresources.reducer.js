const todoListResourcesReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_TODO_LIST_RESOURCES":
            return [...action.payload];
        case "POST_ANON_TODO_LIST":
            return [...state, action.payload];
        default:
            return state;
    }
    }
    
    export default todoListResourcesReducer;