import { ServerActions, NavigateActions, UserActions, PostActions, MessageActions, FriendsActions } from "../types/store";
import { AppState } from "../types/store";
import { Actions } from "../types/store";

export const reducer = (actions: Actions, appState: AppState) => {
    const {action, payload} = actions;

    switch (action) {
        case ServerActions.SAVE_SERVER:
            appState.Servers = [...appState.Servers, payload]
            return appState

        case ServerActions.GET_SERVERS:
            appState.Servers = payload
            return appState

        case ServerActions.CHANGE_SELECTED_SERVER:
            appState.serverState = payload;
            return appState;

        case PostActions.SAVE_POST:
            appState.Post = [...appState.Post, payload]
            return appState
    
        case PostActions.GET_POST:
            appState.Post = payload
            return appState

        case MessageActions.SAVE_MESSAGE:
            appState.Messages = [...appState.Messages, payload]
            return appState
        
        case MessageActions.GET_MESSAGE:
            appState.Messages = payload
            return appState

        case NavigateActions.NAVIGATE:
            appState.screens = payload;
            return appState

        case UserActions.SET_USER:
            appState.user = payload;
            return appState

        case UserActions.ADD_USER:
            appState.userInfo = payload
            return appState

        case UserActions.GET_USERS:
            appState.Users = payload
            return appState

        case FriendsActions.ADD_FRIEND:
            appState.Friends = [...appState.Friends, payload]
            return appState
            
        case FriendsActions.GET_FRIENDS:
            appState.Friends = payload
            return appState

        default:
            return appState
    }
}