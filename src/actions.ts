import { Auth } from "aws-amplify";
import { Map } from "immutable";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { IPost } from "./types";

const initialState: IState = {
    posts: Map(),
};

export interface IState {
    posts: Map<string, IPost>;
}

export type IAction = AddPostAction | RemovePostAction;

export type IDispatch = ThunkDispatch<IState, {}, IAction>;

type ThunkResult<R> = ThunkAction<R, IState, {}, IAction>;

export enum ActionTypes {
    ADD_POST = "ADD_POST",
    REMOVE_POST = "REMOVE_POST",
    SET_USER_ID = "SET_USER_ID",
}

export interface AddPostAction {
    readonly type: ActionTypes.ADD_POST;
    readonly post: IPost;
}

export interface RemovePostAction {
    readonly type: ActionTypes.REMOVE_POST;
    readonly id: string;
}

export function addPost(post: IPost): AddPostAction {
    return {
        type: ActionTypes.ADD_POST,
        post,
    };
}

export function removePost(id: string): RemovePostAction {
    return {
        type: ActionTypes.REMOVE_POST,
        id,
    };
}

export function addPostRemote(post: IPost): ThunkResult<void> {
    return async function(dispatch: IDispatch) {
        const session = await Auth.currentSession();

        await fetch(`https://wx20qxsvs7.execute-api.us-west-2.amazonaws.com/beta/${post.id}/`, {
            method: "PUT",
            body: JSON.stringify(post),
            headers: {
                "Content-Type": "application/json",
                "Authorization": session.getIdToken().getJwtToken(),
            },
        });

        dispatch(addPost(post));
    };
}

export function removePostRemote(id: string): ThunkResult<void> {
    return async function(dispatch: IDispatch) {
        const session = await Auth.currentSession();

        await fetch(`https://wx20qxsvs7.execute-api.us-west-2.amazonaws.com/beta/${id}/`, {
            method: "DELETE",
            headers: {
                Authorization: session.getIdToken().getJwtToken(),
            },
        });

        dispatch(removePost(id));
    };
}

export function fetchPosts(): ThunkResult<void> {
    return async function(dispatch: IDispatch) {
        const session = await Auth.currentSession();

        const response = await fetch(`https://wx20qxsvs7.execute-api.us-west-2.amazonaws.com/beta/`, {
            headers: {
                Authorization: session.getIdToken().getJwtToken(),
            },
        });

        const data = await response.json();

        return data.entries.forEach(entry => dispatch(addPost(entry)));
    };
}

export function rootReducer(state: IState = initialState, action: IAction) {
    switch (action.type) {
        case ActionTypes.ADD_POST:
            return {
                ...state,
                posts: state.posts.set(action.post.id, action.post),
            };
        case ActionTypes.REMOVE_POST:
            return {
                ...state,
                posts: state.posts.remove(action.id),
            };
        default:
            return state;
    }
}
