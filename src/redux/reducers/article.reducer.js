import { combineReducers } from "redux";

const articleList = (state = [], action) => {
    switch (action.type) {
        case 'SET_ARTICLES_LIST':
            return action.payload || state;
        default:
            return state;
    }
};

const articleDetail = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ARTICLE_DETAIL':
            return action.payload || state;
        default:
            return state;
    }
};

export default combineReducers({
    articleDetail,
    articleList,
});