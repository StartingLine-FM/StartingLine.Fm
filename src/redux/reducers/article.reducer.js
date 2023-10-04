import { combineReducers } from "redux";

const articleList = (state = [], action) => {
    switch (action.type) {
        case 'SET_ARTICLES_LIST':
            return action.payload || state;
        default:
            return state;
    }
};

const article = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ARTICLE':
            return action.payload || state;
        default:
            return state;
    }
};

export default combineReducers({
    article,
    articleList,
});