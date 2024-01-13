import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Store from '../states/store';
import AppRouter from '../routers/client/AppRouter.jsx';
import LoadingPage from './LoadingPage.jsx';

const Devengers = () => {
    const [store, setStore] = useState(null);

    const initializeStore = async () => {
        const store = await Store();
        setStore(store);
    };

    useEffect(() => {
        initializeStore();
    }, []);

    return store ? (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    ) : <LoadingPage />;
};

export default Devengers;