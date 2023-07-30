// adminCategoriesReducer.js
const CategoriesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_CATEGORIES':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default CategoriesReducer;