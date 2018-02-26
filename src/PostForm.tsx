import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { addPost, IState } from "./actions";
import { IPost } from "./types";

export interface PostFormProps {
    id: string;
    title?: string;
    body?: string;
    onSubmit: (post: IPost) => void;
}

export interface PostFormState {
    title: string;
    body: string;
}

export class PostForm extends React.PureComponent<PostFormProps, PostFormState> {
    constructor(props: PostFormProps) {
        super(props);

        this.state = this.initialState();
    }

    initialState() {
        return {
            title: this.props.title || "",
            body: this.props.body || "",
        };
    }

    handleChangeTitle = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            title: event.currentTarget.value,
        });
    }

    handleChangeBody = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            body: event.currentTarget.value,
        });
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        this.setState(this.initialState());

        this.props.onSubmit({
            id: this.props.id,
            ...this.state,
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Title: <input
                    value={this.state.title}
                    onChange={this.handleChangeTitle}
                />
                </label>
                <label>Body: <input
                    value={this.state.body}
                    onChange={this.handleChangeBody}
                />
                </label>
                <input type="submit" />
            </form>
        );
    }
}

export default PostForm;
