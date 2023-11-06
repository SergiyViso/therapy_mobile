import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import authReducer from '../reducers/authReducer';
import mainReducer from '../reducers/mainReducer';
const rootReducer = combineReducers({
    auth: authReducer,
    main: mainReducer
});

const middleware = composeWithDevTools(applyMiddleware(thunk));

export default createStore(rootReducer, middleware);