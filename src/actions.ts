const initialState: IState = {
    title: 'Test Post',
    body: 'Test post body'
};

export interface IState {
    readonly title: string,
    readonly body: string
}

export enum ActionTypes {
    SET_TITLE = 'SET_TITLE',
    SET_BODY = 'SET_BODY'
}

export interface SetTitleAction {
    readonly type: ActionTypes.SET_TITLE,
    readonly title: string
}

export interface SetBodyAction {
    readonly type: ActionTypes.SET_BODY,
    readonly body: string
}

export type IAction = SetTitleAction | SetBodyAction;

export function rootReducer(state: IState = initialState, action: IAction) {
    switch (action.type) {
        case ActionTypes.SET_TITLE:
        return {
            ...state,
            title: action.title
        };
        case ActionTypes.SET_BODY:
        return {
            ...state,
            body: action.body
        }
        default:
        return state;
    }
}