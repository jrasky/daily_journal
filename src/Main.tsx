import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { withAuthenticator } from "aws-amplify-react";
import { Map } from "immutable";
import * as moment from "moment";

import { fetchPosts, IState } from "./actions";
import PostController from "./PostController";
import { IPost } from "./types";

export interface MainProps {
    onFetchPosts: () => void;
    posts: Map<string, IPost>;
    authState?: string;
}

export class Main extends React.PureComponent<MainProps> {
    render() {
        const hasTopPost = this.props.posts.has(Main.getCurrentPostId());
        const topPost = this.props.posts.get(Main.getCurrentPostId(), Main.getDefaultCurrentPost());
        const otherPosts = this.props.posts.remove(Main.getCurrentPostId()).valueSeq().toArray();

        return (
            <div>
                <div id={"top-post"}>
                    <PostController post={topPost} editing={!hasTopPost}/>
                </div>
                <div className={"d-flex flex-wrap align-items-start"}>
                    {Main.mapPostsToControllers(otherPosts)}
                </div>
            </div>
        );
    }

    componentWillMount() {
        this.props.onFetchPosts();
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

    static mapPostsToControllers(posts: IPost[]) {
        return posts.map(post => (
            <PostController
                key={post.id}
                post={post}
            />
        ));
    }
}

function mapStateToProps(state: IState) {
    return {
        posts: state.posts,
    };
}

function mapDispatchToProps(dispatch: Dispatch<IState>) {
    return {
        onFetchPosts: () => { dispatch(fetchPosts()); },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
