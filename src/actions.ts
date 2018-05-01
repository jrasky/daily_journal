import { Map } from "immutable";
import { Dispatch } from "redux";

import { IPost, IPostList } from "./types";

const initialState: IState = {
    posts: Map(),
    userId: ""
}

export interface IState {
    posts: Map<string, IPost>;
    userId: string;
}

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

export interface SetUserIdAction {
    readonly type: ActionTypes.SET_USER_ID;
    readonly userId: string;
}

export function setUserId(userId: string) {
    return {
        type: ActionTypes.SET_USER_ID,
        userId,
    }
}

export function addPost(post: IPost) {
    return {
        type: ActionTypes.ADD_POST,
        post,
    };
}

export function addPostRemote(post: IPost) {
    return function(dispatch: Dispatch<IState>, getState: () => IState) {
        return fetch(`https://widgbtf9z9.execute-api.us-west-2.amazonaws.com/beta/${getState().userId}/${post.id}/`, {
            method: "PUT",
            body: JSON.stringify(post),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(
            () => { dispatch(addPost(post)); },
            error => console.log("An error occurred", error),
        );
    };
}

export function removePost(id: string) {
    return {
        type: ActionTypes.REMOVE_POST,
        id,
    };
}

export function removePostRemote(id: string) {
    return function(dispatch: Dispatch<IState>, getState: () => IState) {
        return fetch(`https://widgbtf9z9.execute-api.us-west-2.amazonaws.com/beta/${getState().userId}/${id}/`, {
            method: "DELETE",
        }).then(
            () => { dispatch(removePost(id)); },
            error => console.log("An error occurred", error),
        );
    };
}

export function fetchPosts() {
    return function(dispatch: Dispatch<IState>, getState: () => IState) {
        return fetch(`https://widgbtf9z9.execute-api.us-west-2.amazonaws.com/beta/${getState().userId}`)
            .then(
                response => response.json(),
                error => console.log("An error occurred", error),
            )
            .then((data: IPostList) => {
                data.entries.forEach(entry => dispatch(addPost(entry)));
            });
    };
}

export type IAction = SetUserIdAction | AddPostAction | RemovePostAction;

export function rootReducer(state: IState = initialState, action: IAction) {
    switch (action.type) {
        case ActionTypes.SET_USER_ID:
            return {
                ...state,
                userId: action.userId
            }
        case ActionTypes.ADD_POST:
            return {
                ...state,
                posts: state.posts.set(action.post.id, action.post)
            }
        case ActionTypes.REMOVE_POST:
            return {
                ...state,
                posts: state.posts.remove(action.id)
            }
        default:
            return state;
    }
}
