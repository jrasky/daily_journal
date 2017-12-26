import * as React from 'react';

import { IPost } from './types';

export interface PostProps {
    id: string,
    title: string,
    body: string,
    onRemove: (id: string) => void
}

export function Post(props: PostProps) {
    return <div>
        <h1>{ props.title }</h1>
        <p>{ props.body }</p>
        <button onClick={ () => props.onRemove(props.id) }>Remove</button>
    </div>;
}

export default Post