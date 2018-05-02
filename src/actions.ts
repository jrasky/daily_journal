import { Auth } from "aws-amplify";
import { Map } from "immutable";
import { Dispatch } from "redux";

import { IPost, IPostList } from "./types";

const initialState: IState = {
    posts: Map(),
};

export interface IState {
    posts: Map<string, IPost>;
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

export function addPost(post: IPost) {
    return {
        type: ActionTypes.ADD_POST,
        post,
    };
}

export function removePost(id: string) {
    return {
        type: ActionTypes.REMOVE_POST,
        id,
    };
}

export function addPostRemote(post: IPost) {
    return function(dispatch: Dispatch<IState>) {
        return Auth.currentSession().then(session =>
            fetch(`https://wx20qxsvs7.execute-api.us-west-2.amazonaws.com/beta/${post.id}/`, {
                method: "PUT",
                body: JSON.stringify(post),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": session.getIdToken().getJwtToken(),
                },
            }),
        ).then(
            () => { dispatch(addPost(post)); },
            error => console.log("An error occurred", error),
        );
    };
}

export function removePostRemote(id: string) {
    return function(dispatch: Dispatch<IState>) {
        return Auth.currentSession().then(session =>
            fetch(`https://wx20qxsvs7.execute-api.us-west-2.amazonaws.com/beta/${id}/`, {
                method: "DELETE",
                headers: {
                    Authorization: session.getIdToken().getJwtToken(),
                },
            }),
        ).then(
            () => { dispatch(removePost(id)); },
            error => console.log("An error occurred", error),
        );
    };
}

export function fetchPosts() {
    return function(dispatch: Dispatch<IState>) {
        return Auth.currentSession().then(session =>
            fetch(`https://wx20qxsvs7.execute-api.us-west-2.amazonaws.com/beta/`, {
                headers: {
                    Authorization: session.getIdToken().getJwtToken(),
                },
            }),
        ).then(
            response => response.json(),
            error => console.log("An error occurred", error),
        ).then((data: IPostList) => {
            data.entries.forEach(entry => dispatch(addPost(entry)));
        });
    };
}

export type IAction = AddPostAction | RemovePostAction;

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
