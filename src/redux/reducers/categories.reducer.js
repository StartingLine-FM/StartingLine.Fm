// The CategoriesReducer is a Redux reducer function that's responsible for 
// updating the state relating to categories.
// Reducers specify how the application's state changes in response to actions 
// sent to the store.
const CategoriesReducer = (state = [], action) => {
  switch (action.type) {
      // In the case of the 'SET_CATEGORIES' action, it returns the payload 
      // of the action which is the new state for categories.
      case 'SET_CATEGORIES':
          return action.payload;
      // If the action type doesn't match any existing types, 
      // it returns the current state without making any changes.
      default:
          return state;
  }
};

// Export the CategoriesReducer as a default export so it can be used by other modules.
export default CategoriesReducer;