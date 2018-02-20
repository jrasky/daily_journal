import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import { IState, addPostRemote, fetchPosts } from './actions';
import { IPost } from './types';
import PostList from './PostList';
import PostController from './PostController';
import { Dispatch } from 'redux';

export interface MainProps {
    onAddPost: (post: IPost) => void,
    onFetchPosts: () => void,
    posts: Map<string, IPost>
}

export class Main extends React.PureComponent<MainProps> {
    render() {
        return <div>
            <PostController
                post={this.props.posts.get(Main.getCurrentPostId(), Main.getDefaultCurrentPost())}
                editing={!this.props.posts.has(Main.getCurrentPostId())} />
            <PostList
                posts={this.props.posts.remove(Main.getCurrentPostId()).valueSeq().toArray()} />
        </div>;
    }

    componentWillMount() {
        this.props.onFetchPosts();
    }

    onPostSubmit(post: IPost) {
        this.props.onAddPost(post);
    }

    static getDefaultCurrentPost() {
        return {
            id: Main.getCurrentPostId(),
            title: moment().subtract(4, 'hours').format('LL'),
            body: ''
        };
    }

    static getCurrentPostId() {
        return moment().subtract(4, 'hours').format('YYYYDDDD');
    }
}

function mapStateToProps(state: IState) {
    return {
        posts: state
    };
}

function mapDispatchToProps(dispatch: Dispatch<IState>) {
    return {
        onAddPost: (post: IPost) => { dispatch(addPostRemote(post)) },
        onFetchPosts: () => { dispatch(fetchPosts()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)