import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './Home';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Home />
        </Provider>
    );
};

export default App;
