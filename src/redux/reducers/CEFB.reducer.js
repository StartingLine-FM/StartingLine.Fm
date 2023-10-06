const CEFB_Reducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_CEFB':
        return action.payload;
      default:
        return state.map(event => ({...event, color: 'green'}));;
    }
  };
  
   //This holds the data scraped from NDSU CEFB Calendar

  
  export default CEFB_Reducer;