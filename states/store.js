import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import authReducer from './reducers/auth';
import thunk from 'redux-thunk';
import { fetchAPI, fetchCookie } from '../utils/dataFetching';
import { login } from './actions/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

export default async () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
        }),
        composeEnhancers(applyMiddleware(thunk)));

    const cookies = fetchCookie();
    if (cookies['auth-uid']) {
        const { status, data } = await fetchAPI('POST', '/authenticate', null);
        if (status !== 200) {
            store.dispatch(login(data));
        }
    }

    return store;
};