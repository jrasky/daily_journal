import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";

import { rootReducer } from "./actions";
import Main from "./Main";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunkMiddleware),
    ),
);

ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <Main />
        </Provider>
    </AppContainer>,
    document.getElementById("root"),
);

if ((module as any).hot) {
    (module as any).hot.accept();
}
