const todoListResourcesReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_TODO_LIST_RESOURCES":
            return [...action.payload];
        default:
            return state;
    }
    }
    
    export default todoListResourcesReducer;