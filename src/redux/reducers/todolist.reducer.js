const todoListReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_TODO_LIST":
            return action.payload;
        default:
            return state;
    }
    }
    
    export default todoListReducer;