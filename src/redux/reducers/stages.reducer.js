// adminStagesReducer.js
const StagesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_STAGES':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default StagesReducer;