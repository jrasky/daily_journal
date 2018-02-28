import * as React from "react";

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
