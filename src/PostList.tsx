import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { IState, removePost } from './actions';
import { IPost } from './types';
import Post from './Post';

export interface PostListProps {
    posts: IPost[],
    onRemovePost: (id: string) => void
}

export function PostList(props: PostListProps) {
    return <div>
        {props.posts.map(post => <Post
            key={post.id}
            id={post.id}
            onRemove={props.onRemovePost}
            title={post.title}
            body={post.body}
            />)}
    </div>;
}

function mapStateToProps(state: IState) {
    return {
        posts: state.valueSeq().toArray()
    }
}

function mapDispatchToProps(dispatch: Dispatch<IState>) {
    return {
        onRemovePost: (id: string) => dispatch(removePost(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)