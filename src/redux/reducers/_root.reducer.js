import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import search from './search.reducer'
import admin from './admin.reducer';
import todoListReducer from './todolist.reducer';
import todoListResourcesReducer from './todolistresources.reducer';
import EP_Reducer from './EP.reducer';
import FU_Reducer from './FU.reducer';
import chamber_Reducer from './chamber.reducer';
import tableListReducer from './tablelist.reducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  search,// current search results
  admin, //gives the user access to adding, updating and deleting resources if logged in as an admin
  EP_Reducer, //gives the user access to the scraped Emerging Prairie Calendar
  FU_Reducer, //gives the user access to the scraped Fargo Underground Calendar
  chamber_Reducer, //gives the user access to the scraped FMWF Chamber of Commerce Calendar
  todoListReducer,
  todoListResourcesReducer,
  tableListReducer
 // will have an id and username if someone is logged in

});

export default rootReducer;
