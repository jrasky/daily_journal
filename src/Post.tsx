import * as React from 'react';

export interface PostProps {
    title: string,
    body: string
}

export default class Post extends React.Component<PostProps, {}> {
    render () {
        return <div>
            <h1>{ this.props.title }</h1>
            <p>{ this.props.body }</p>
        </div>;
    }
}