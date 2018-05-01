import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";

import Amplify from "aws-amplify";

import { rootReducer } from "./actions";
import Main from "./Main";

// Register with Cognito
Amplify.configure({
    Auth: {
        identityPoolId: "us-west-2:d1325331-c956-427b-87ed-75dde6851876",
        region: "us-west-2",
        userPoolId: "us-west-2_tsY8TbBZf",
        userPoolWebClientId: "63livl550ck1t281r3brnrblpp",
    },
});

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
