import * as React from "react";
import { connect } from "react-redux";

import ReactMarkdown = require("react-markdown");

import { addPostRemote, IDispatch, removePostRemote } from "./actions";
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
                <div className={"card m-1"}>
                    <div className={"card-body"}>
                        <PostForm
                            id={this.props.post.id}
                            title={this.props.post.title}
                            body={this.props.post.body}
                            onSubmit={this.onPostSubmit}
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div className={"card m-1"}>
                    <div className={"card-body"}>
                        <h1 className={"card-title"}>{this.props.post.title}</h1>
                        <ReactMarkdown className={"card-text"} source={this.props.post.body} />
                        <button
                            type={"button"}
                            className={"btn btn-primary"}
                            onClick={this.onClickEdit}
                        >
                            Edit
                        </button>
                        <button
                            type={"button"}
                            className={"btn btn-danger"}
                            onClick={this.onClickRemove}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            );
        }
    }
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onAddPost: (post: IPost) => { dispatch(addPostRemote(post)); },
        onRemovePost: (id: string) => { dispatch(removePostRemote(id)); },
    };
}

export default connect(null, mapDispatchToProps)(PostController);
