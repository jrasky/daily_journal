import * as React from "react";

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

    handleChangeBody = (event: React.FormEvent<HTMLTextAreaElement>) => {
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
                <div className={"form-group"}>
                    <label
                        className={"bmd-label-placeholder"}
                        htmlFor={`post-form-title-${this.props.id}`}
                    >
                        Title
                    </label>
                    <input
                        id={`post-form-title-${this.props.id}`}
                        className={"form-control"}
                        value={this.state.title}
                        onChange={this.handleChangeTitle}
                    />
                </div>
                <div className={"form-group"}>
                    <label
                        className={"bmd-label-placeholder"}
                        htmlFor={`post-form-body-${this.props.id}`}
                    >
                        Body
                    </label>
                    <textarea
                        id={`post-form-body-${this.props.id}`}
                        className={"form-control"}
                        value={this.state.body}
                        onChange={this.handleChangeBody}
                    />
                </div>
                <button type="submit" className={"btn btn-primary btn-raised"}>Submit</button>
            </form>
        );
    }
}

export default PostForm;
