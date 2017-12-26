import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import { createStore } from 'redux';

import Main from './Main';

import { rootReducer } from './actions';

const store = createStore(
    rootReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
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