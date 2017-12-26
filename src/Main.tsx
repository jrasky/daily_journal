import * as React from 'react';

import PostList from './PostList';
import NewPost from './NewPost';

export default function Main() {
    return <div>
        <PostList />
        <NewPost />
    </div>;
}