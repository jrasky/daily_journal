import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";

import Amplify from "aws-amplify";
import { AmplifyTheme, Authenticator } from "aws-amplify-react";

import { rootReducer } from "./actions";

import AuthFlow from "./AuthFlow";
import Main from "./Main";

const here = document.location.origin + document.location.pathname;

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
            redirectSignIn: here,
            redirectSignOut: here,
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

// Remove the default styling of Authenticator's container
const blankTheme = {
    ...AmplifyTheme,
    container: null,
};

function renderApp(RealAuthFlow, RealMainContainer) {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Authenticator hideDefault={true} theme={blankTheme}>
                    <RealAuthFlow />
                    <RealMainContainer />
                </Authenticator>
            </Provider>
        </AppContainer>,
        document.getElementById("root"),
    );
}

function MainContainer(props) {
    return props.authState === "signedIn" && (
        <Main />
    );
}

renderApp(AuthFlow, MainContainer);

if ((module as any).hot) {
    (module as any).hot.accept(["./AuthFlow", "./Main"], function() {
        renderApp(require("./AuthFlow").default, require("./Main").default);
    });

    (module as any).hot.accept("./actions", function() {
        const nextActions = require("./actions");

        store.replaceReducer(nextActions.rootReducer);
    });
}
