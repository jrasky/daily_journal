import { Map } from 'immutable';

import { IPost } from './types';

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

export function addPost(post: IPost): AddPostAction {
    return {
        type: ActionTypes.ADD_POST,
        post
    }
}

export function removePost(id: string): RemovePostAction {
    return {
        type: ActionTypes.REMOVE_POST,
        id
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