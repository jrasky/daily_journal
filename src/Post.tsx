import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { IState, removePost } from "./actions";
import PostForm from "./PostForm";
import { IPost } from "./types";

export interface PostProps {
    title: string;
    body: string;
}

export function Post(props: PostProps) {
    return (
        <div>
            <h1>{props.title}</h1>
            <p>{props.body}</p>
        </div>
    );
}

export default Post;
