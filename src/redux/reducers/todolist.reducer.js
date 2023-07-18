const todoListReducer = (state = [], action) => {
switch (action.type) {
    case "SET_TODO_LIST":
        return action.paylaod;
    default:
        return state;
}
}