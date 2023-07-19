const EP_Reducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_EP':
        return action.payload;
      default:
        return state;
    }
  };
  
   //This holds the data scraped from Emerging Prairie Calendar

  
  export default EP_Reducer;