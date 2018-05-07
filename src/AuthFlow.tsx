import * as React from "react";

import { Auth } from "aws-amplify";
import { withAuthenticator, withOAuth } from "aws-amplify-react";

export interface AuthFlowProps {
    OAuthSignIn: () => void;
    authState?: string;
}

export class AuthFlow extends React.Component<AuthFlowProps> {
    state = {name: ""};

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.authState === "signedIn") {
            return (
                <div>
                    <h1>{this.state.name}</h1>
                    <button onClick={AuthFlow.onClickSignOut}>
                        Sign Out
                    </button>
                </div>
            );
        } else {
            return (
                <div>
                    <button onClick={this.props.OAuthSignIn}>
                        Sign In
                    </button>
                </div>
            );
        }
    }

    componentDidMount() {
        this.loadName();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.name === "") {
            this.loadName();
        }
    }

    static getDerivedStateFromProps(nextProps: AuthFlowProps, prevState) {
        if (nextProps.authState !== "signedIn") {
            return {
                ...prevState,
                name: "",
            };
        } else {
            return null;
        }
    }

    static onClickSignOut() {
        Auth.signOut();
    }

    private loadName() {
        if (this.props.authState !== "signedIn") {
            return;
        }

        this.getName().then(
            name => this.setState({name}),
        );
    }

    private async getName() {
        const { attributes } = await Auth.currentUserInfo();

        return attributes.name;
    }
}

export default withOAuth(AuthFlow);
