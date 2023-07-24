const tableListReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_TABLE_LIST":
            return action.payload;
        default:
            return state;
    }
    }
    
    export default tableListReducer;