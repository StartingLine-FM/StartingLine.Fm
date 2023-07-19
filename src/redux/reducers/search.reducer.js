const searchReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_SEARCH':
        return action.payload || state;
      default:
        return state;
    }
  };
  
  export default searchReducer;