const FU_Reducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_FU':
        return action.payload;
      default:
        return state;
    }
  };
  
  //This holds the data scraped from Fargo Underground Calendar

  
  export default FU_Reducer;