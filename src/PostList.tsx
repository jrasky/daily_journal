import * as React from 'react';

import { IPost } from './types';
import PostController from './PostController';

export interface PostListProps {
    posts: IPost[]
}

export function PostList(props: PostListProps) {
    return <div>
        {props.posts.map(post => <PostController
            key={post.id}
            post={post}
        />)}
    </div>;
}

export default PostList;