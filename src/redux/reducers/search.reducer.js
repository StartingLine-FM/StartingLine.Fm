const searchReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_SEARCH':
        return action.payload || state;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.search
  export default searchReducer;