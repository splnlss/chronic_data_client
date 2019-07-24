import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import {loadAuthToken} from './local-storage';
import authReducer from './auth/reducers/auth';
import documentsReducer from './components/documentViewer/reducer/documentReducer';
import protectedDataReducer from './auth/reducers/protected-data';
import {setAuthToken, refreshAuthToken} from './auth/actions/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        documents: documentsReducer,
        protectedData: protectedDataReducer
    }),
    composeEnhancers(
      applyMiddleware(thunk),
    )

);


// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;
