import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { withAuthenticator } from "aws-amplify-react";
import { CognitoUser } from "amazon-cognito-identity-js";
import { Map } from "immutable";
import * as moment from "moment";

import { setUserId, addPostRemote, fetchPosts, IState } from "./actions";
import PostController from "./PostController";
import PostList from "./PostList";
import { IPost } from "./types";

export interface MainProps {
    onAddPost: (post: IPost) => void;
    onFetchPosts: () => void;
    onSetUserId: (userId: string) => void;
    posts: Map<string, IPost>;
    authData: CognitoUser;
}

export class Main extends React.PureComponent<MainProps> {
    render() {
        return (
            <div>
                <PostController
                    post={this.props.posts.get(Main.getCurrentPostId(), Main.getDefaultCurrentPost())}
                    editing={!this.props.posts.has(Main.getCurrentPostId())}
                />
                <PostList
                    posts={this.props.posts.remove(Main.getCurrentPostId()).valueSeq().toArray()}
                />
            </div>
        );
    }

    componentWillMount() {
        // TODO maybe make the whole userId thing a part of IPost?
        this.props.onSetUserId(this.props.authData.getUsername());
        this.props.onFetchPosts();
    }

    onPostSubmit(post: IPost) {
        this.props.onAddPost(post);
    }

    static getDefaultCurrentPost() {
        return {
            id: Main.getCurrentPostId(),
            title: moment().subtract(4, "hours").format("LL"),
            body: "",
        };
    }

    static getCurrentPostId() {
        return moment().subtract(4, "hours").format("YYYYDDDD");
    }
}

function mapStateToProps(state: IState) {
    return {
        posts: state.posts,
    };
}

function mapDispatchToProps(dispatch: Dispatch<IState>) {
    return {
        onAddPost: (post: IPost) => { dispatch(addPostRemote(post)); },
        onFetchPosts: () => { dispatch(fetchPosts()); },
        onSetUserId: (userId: string) => { dispatch(setUserId(userId)); },
    };
}

export default withAuthenticator(connect(mapStateToProps, mapDispatchToProps)(Main));
