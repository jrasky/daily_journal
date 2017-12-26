import * as React from 'react';
import { connect } from 'react-redux';

import { IState, addPost } from './actions';
import { IPost } from './types';

import PostForm from './PostForm';
import { Dispatch } from 'redux';

export interface NewPostProps {
    onAddPost: (post: IPost) => void
};

export class NewPost extends React.PureComponent<NewPostProps> {
    onSubmitPost(post: IPost) {
        this.props.onAddPost(post);
    }

    render() {
        return <PostForm onSubmit={post => this.onSubmitPost(post)} />;
    }
}

function mapDispatchToProps(dispatch: Dispatch<IState>) {
    return {
        onAddPost: (post: IPost) => { dispatch(addPost(post)) }
    }
}

export default connect(null, mapDispatchToProps)(NewPost);