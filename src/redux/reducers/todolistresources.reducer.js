const todoListResourcesReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_TODO_LIST_RESOURCES":
            return action.paylaod;
        default:
            return state;
    }
    }
    
    export default todoListResourcesReducer;