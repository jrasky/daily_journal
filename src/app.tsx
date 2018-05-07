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
        userPoolId: "us-west-2_4k9vzJHIk",
        userPoolWebClientId: "6l0g67cnl69smg5s3q0108tfs3",
        oauth: {
            domain: "daily-journal.auth.us-west-2.amazoncognito.com",
            scope: ["phone", "email", "profile", "openid", "aws.cognito.signin.user.admin"],
            redirectSignIn: "http://localhost:3000",
            redirectSignOut: "http://localhost:3000",
            responseType: "code",
        },
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
