import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { IState, removePost } from './actions';
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

function mapStateToProps(state: IState) {
    return {
        posts: state.valueSeq().toArray()
    }
}

export default connect(mapStateToProps)(PostList)