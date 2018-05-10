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
                <div className={"jumbotron my-3 pb-4"}>
                    <h1 className={"display-2"}>{this.state.name}</h1>
                    <hr className={"my-4"} />
                    <button className={"btn btn-secondary"} onClick={AuthFlow.onClickSignOut}>
                        Sign Out
                    </button>
                </div>
            );
        } else {
            return (
                <div className={"jumbotron my-3 pb-4"}>
                    <h1 className={"display-2"}>Hello!</h1>
                    <hr className={"my-4"} />
                    <button className={"btn btn-raised btn-primary"} onClick={this.props.OAuthSignIn}>
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
