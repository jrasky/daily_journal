import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Main from './Main';

ReactDOM.render(
    <AppContainer>
        <Main />
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}