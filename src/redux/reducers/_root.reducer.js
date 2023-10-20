import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import search from './search.reducer'
import admin from './admin.reducer';
import todoListResourcesReducer from './todolistresources.reducer';
import EP_Reducer from './EP.reducer';
import FU_Reducer from './FU.reducer';
import chamber_Reducer from './chamber.reducer';
import CEFB_Reducer from './CEFB.reducer';
import tableListReducer from './tablelist.reducer';
import CategoriesReducer from './categories.reducer';
import StagesReducer from './stages.reducer';
import adminReducer from './admin.reducer';
import articles from './article.reducer';

import { EP_Loading_Reducer, FU_Loading_Reducer, chamber_Loading_Reducer, CEFB_Loading_Reducer } from './loading.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  search,// current search results
  admin: adminReducer, //gives the user access to adding, updating and deleting resources, categories and stages if logged in as an admin
  EP_Reducer, //gives the user access to the scraped Emerging Prairie Calendar
  FU_Reducer, //gives the user access to the scraped Fargo Underground Calendar
  chamber_Reducer, //gives the user access to the scraped FMWF Chamber of Commerce Calendar
  CEFB_Reducer, //gives the user access to the scraped NDSU CEFB Calendar
  todoListResourcesReducer,
  tableListReducer, // will have an id and username if someone is logged in
  categories: CategoriesReducer, //sets the categories for the project
  stages: StagesReducer, // sets the stages for the project
  EP_Loading_Reducer,
  FU_Loading_Reducer,
  chamber_Loading_Reducer,
  articles,

  CEFB_Loading_Reducer,
  // will have an id and username if someone is logged in

});

export default rootReducer;
