import * as React from 'react';
import { connect } from 'react-redux';

import { IState } from './actions';

export interface PostProps {
    title: string,
    body: string
}


export class Post extends React.PureComponent<PostProps> {
    render () {
        return <div>
            <h1>{ this.props.title }</h1>
            <p>{ this.props.body }</p>
        </div>;
    }
}

function mapStateToProps(state: IState): PostProps {
    return {
        title: state.title,
        body: state.body
    }
}

export default connect(mapStateToProps)(Post);