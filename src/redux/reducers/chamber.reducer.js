const chamber_Reducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_CHAMBER':
        return action.payload;
      default:
        return state.map(event => ({...event, color: 'purple'}));;
    }
  };
  
   //This holds the data scraped from chamber of commerce

  
  export default chamber_Reducer;