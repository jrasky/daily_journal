import * as React from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';

import { IPost } from './types';
import { IState, addPost } from './actions';
import { Dispatch } from 'redux';

export interface PostFormProps {
    onAddPost: (post: IPost) => void
}

export interface PostFormState {
    title: string,
    body: string
}

export class PostForm extends React.PureComponent<PostFormProps, PostFormState> {
    constructor(props: PostFormProps) {
        super(props);
        
        this.state = {
            title: '',
            body: ''
        }
    }

    handleChangeTitle(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            title: event.currentTarget.value
        });
    }
    
    handleChangeBody(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            body: event.currentTarget.value
        });
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        this.props.onAddPost({
            id: uuid(),
            title: this.state.title,
            body: this.state.body
        });

        this.setState({
            title: '',
            body: ''
        });
    }

    render() {
        const handleChangeTitle = this.handleChangeTitle.bind(this);
        const handleChangeBody = this.handleChangeBody.bind(this);
        const handleSubmit = this.handleSubmit.bind(this);

        return (
            <form onSubmit={handleSubmit}>
                <label>Title: <input value={this.state.title} onChange={handleChangeTitle}/></label>
                <label>Body: <input value={this.state.body} onChange={handleChangeBody}/></label>
                <input type='submit' />
            </form>
        )
    }
}

function mapStateToProps(state: IState) {
    return {};
}

function mapDispatchToProps(dispatch: Dispatch<IState>) {
    return {
        onAddPost: (post: IPost) => { dispatch(addPost(post)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);