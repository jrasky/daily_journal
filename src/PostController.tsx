import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { addPostRemote, IState, removePostRemote } from "./actions";
import Post from "./Post";
import PostForm from "./PostForm";
import { IPost } from "./types";

export interface PostControllerProps {
    post: IPost;
    editing?: boolean;
    onAddPost: (post: IPost) => void;
    onRemovePost: (id: string) => void;
}

export interface PostControllerState {
    editing: boolean;
}

export class PostController extends React.PureComponent<PostControllerProps, PostControllerState> {
    constructor(props: PostControllerProps) {
        super(props);

        this.state = {
            editing: false,
        };
    }

    onClickEdit = () => {
        this.setState({
            editing: true,
        });
    }

    onClickRemove = () => {
        this.props.onRemovePost(this.props.post.id);
    }

    onPostSubmit = (post: IPost) => {
        this.props.onAddPost(post);

        this.setState({
            editing: false,
        });
    }

    render() {
        if (this.props.editing || this.state.editing) {
            return (
                <div>
                    <PostForm
                        id={this.props.post.id}
                        title={this.props.post.title}
                        body={this.props.post.body}
                        onSubmit={this.onPostSubmit}
                    />
                </div>
            );
        } else {
            return (
                <div>
                    <Post title={this.props.post.title} body={this.props.post.body} />
                    <button onClick={this.onClickEdit}>Edit</button>
                    <button onClick={this.onClickRemove}>Remove</button>
                </div>
            );
        }
    }
}

function mapDispatchToProps(dispatch: Dispatch<IState>) {
    return {
        onAddPost: (post: IPost) => { dispatch(addPostRemote(post)); },
        onRemovePost: (id: string) => { dispatch(removePostRemote(id)); },
    };
}

export default connect(null, mapDispatchToProps)(PostController);
