const fundingReducer = (state = [], action) => {
    switch (action.type) {
        // In the case of the 'SET_FUNDING' action, it returns the payload 
        // of the action which is the new state for funding.
        case 'SET_FUNDING':
            return action.payload;
        // If the action type doesn't match any existing types, 
        // it returns the current state without making any changes.
        default:
            return state;
    }
};

// Export the fundingReducer as a default export so it can be used by other modules.
export default fundingReducer;