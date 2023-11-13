const entrepreneurReducer = (state = [], action) => {
    switch (action.type) {
        // In the case of the 'SET_ENTREPRENEUR' action, it returns the payload 
        // of the action which is the new state for entrepreneur.
        case 'SET_ENTREPRENEUR':
            return action.payload;
        // If the action type doesn't match any existing types, 
        // it returns the current state without making any changes.
        default:
            return state;
    }
};

export default entrepreneurReducer;