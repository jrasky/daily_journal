import { Map } from 'immutable';

import { IPost, IPostList } from './types';
import { Dispatch } from 'redux';

const initialState: IState = Map();

export type IState = Map<string, IPost>;

export enum ActionTypes {
    ADD_POST = 'ADD_POST',
    REMOVE_POST = 'REMOVE_POST'
}

export interface AddPostAction {
    readonly type: ActionTypes.ADD_POST,
    readonly post: IPost
}

export interface RemovePostAction {
    readonly type: ActionTypes.REMOVE_POST,
    readonly id: string
}

export function addPost(post: IPost) {
    return {
        type: ActionTypes.ADD_POST,
        post
    }
}

export function addPostRemote(post: IPost) {
    return function(dispatch: Dispatch<IState>) {
        return fetch(`https://widgbtf9z9.execute-api.us-west-2.amazonaws.com/beta/0/${post.id}/`, {
            method: 'PUT',
            body: JSON.stringify(post),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(
            () => {dispatch(addPost(post))},
            error => console.log('An error occurred', error)
        )
    }
}

export function removePost(id: string) {
    return {
        type: ActionTypes.REMOVE_POST,
        id
    }
}

export function removePostRemote(id: string) {
    return function(dispatch: Dispatch<IState>) {
        return fetch(`https://widgbtf9z9.execute-api.us-west-2.amazonaws.com/beta/0/${id}/`, {
            method: 'DELETE'
        }).then(
            () => {dispatch(removePost(id))},
            error => console.log('An error occurred', error)
        )
    }
}

export function fetchPosts() {
    return function(dispatch: Dispatch<IState>) {
        return fetch('https://widgbtf9z9.execute-api.us-west-2.amazonaws.com/beta/0')
            .then(
                response => response.json(),
                error => console.log('An error occurred', error)
            )
            .then((data: IPostList) => {
                data.entries.forEach(entry => dispatch(addPost(entry)))
            })
    }
}

export type IAction = AddPostAction | RemovePostAction;

export function rootReducer(state: IState = initialState, action: IAction) {
    switch (action.type) {
        case ActionTypes.ADD_POST:
            return state.set(action.post.id, action.post);
        case ActionTypes.REMOVE_POST:
            return state.remove(action.id);
        default:
            return state;
    }
}