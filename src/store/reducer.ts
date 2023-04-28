import { Actions, AppState, AuthActions, FriendsActions, ServersActions } from "../types/store";

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
            
        case FriendsActions.ADD:
            return {
                ...currentState,
                friends: [
                    payload,
                    ...currentState.friends,
                ]
            }

        case ServersActions.ADD2:
            return {
                ...currentState,
                servers: [
                    payload,
                    ...currentState.servers,
                ]
            }
        
        case FriendsActions.GET:
            return {
                ...currentState,
                friends: payload
            }

        case ServersActions.GET2:
            return {
                ...currentState,
                servers: payload
            }
    
        default:
            return currentState;
    }
}