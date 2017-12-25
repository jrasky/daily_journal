import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Post from './Post';

ReactDOM.render(
    <AppContainer>
        <Post title='Test Post' body='Test post content.' />
    </AppContainer>,
    document.getElementById('root')
);

if ((module as any).hot) {
    (module as any).hot.accept();
}