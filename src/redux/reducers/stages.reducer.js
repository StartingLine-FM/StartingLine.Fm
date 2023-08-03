// The StagesReducer is a Redux reducer function that's responsible for 
// updating the state relating to stages.
const StagesReducer = (state = [], action) => {
  switch (action.type) {
      // In the case of the 'SET_STAGES' action, it returns the payload 
      // of the action which is the new state for stages.
      case 'SET_STAGES':
          return action.payload;
      // If the action type doesn't match any existing types, 
      // it returns the current state without making any changes.
      default:
          return state;
  }
};

// Export the StagesReducer as a default export so it can be used by other modules.
export default StagesReducer;
