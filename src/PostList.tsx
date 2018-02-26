import * as React from "react";

import PostController from "./PostController";
import { IPost } from "./types";

export interface PostListProps {
    posts: IPost[];
}

function mapPostsToControllers(posts: IPost[]) {
    return posts.map(post => (
        <PostController
            key={post.id}
            post={post}
        />
    ));
}

export function PostList(props: PostListProps) {
    return (
        <div>
            {mapPostsToControllers(props.posts)}
        </div>
    );
}

export default PostList;
