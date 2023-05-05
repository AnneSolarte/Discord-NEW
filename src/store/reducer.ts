import { Actions, AppState, AuthActions, FriendsActions, ServersActions, PostActions } from "../types/store";

export const reducer = (currentAction: Actions, currentState: AppState): AppState => {
    const { action, payload } = currentAction; 

    switch (action) {
        case AuthActions.LOGIN:
            return {
                ...currentState,
                user: payload.user
            }

        case AuthActions.LOGOUT:
            return {
                ...currentState,
                user: {
                    userName: "",
                    email: ""
                }
            }
            
        case FriendsActions.AddFriend:
            return {
                ...currentState,
                friends: [
                    payload,
                    ...currentState.friends,
                ]
            }

        case ServersActions.AddServer:
            return {
                ...currentState,
                servers: [
                    payload,
                    ...currentState.servers,
                ]
            }

        case PostActions.AddPost:
            return {
                ...currentState,
                post: [
                    payload,
                    ...currentState.post,
                ]
            }
        
        case FriendsActions.GetFriend:
            return {
                ...currentState,
                friends: payload
            }

        case ServersActions.GetServer:
            return {
                ...currentState,
                servers: payload
            }

         case PostActions.GetPost:
            return {
                ...currentState,
                post: payload
            }
    
        default:
            return currentState;
    }
}