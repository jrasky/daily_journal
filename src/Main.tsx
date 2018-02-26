import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Map } from "immutable";
import * as moment from "moment";

import { addPostRemote, fetchPosts, IState } from "./actions";
import PostController from "./PostController";
import PostList from "./PostList";
import { IPost } from "./types";

export interface MainProps {
    onAddPost: (post: IPost) => void;
    onFetchPosts: () => void;
    posts: Map<string, IPost>;
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
        posts: state,
    };
}

function mapDispatchToProps(dispatch: Dispatch<IState>) {
    return {
        onAddPost: (post: IPost) => { dispatch(addPostRemote(post)); },
        onFetchPosts: () => { dispatch(fetchPosts()); },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
