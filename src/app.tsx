import * as React from 'react';
import * as ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware, compose } from 'redux';

import Main from './Main';

import { rootReducer } from './actions';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunkMiddleware)
    )
);

ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <Main />
        </Provider>
    </AppContainer>,
    document.getElementById('root')
);

if ((module as any).hot) {
    (module as any).hot.accept();
}