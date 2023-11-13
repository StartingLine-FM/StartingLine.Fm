// The OrganizationsReducer is a Redux reducer function that's responsible for 
// updating the state relating to organizations.
// Reducers specify how the application's state changes in response to actions 
// sent to the store.
const organizationsReducer = (state = [], action) => {
  switch (action.type) {
    // In the case of the 'SET_ORGANIZATIONS' action, it returns the payload 
    // of the action which is the new state for organizations.
    case 'SET_ORGANIZATIONS':
      return action.payload;
    // If the action type doesn't match any existing types, 
    // it returns the current state without making any changes.
    default:
      return state;
  }
};

// Export the organizationsReducer as a default export so it can be used by other modules.
export default organizationsReducer;