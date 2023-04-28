
import { InterFriends} from "./friends"
import { InterServers} from "./servers"

export type Observer = ({ render: () => void } & HTMLElement);

export type AppState = {
    user: {
        userName: string,
        email: string,
    },
    friends: InterFriends[]
    servers: InterServers[]
}

export enum AuthActions {
    "LOGIN" = "LOGIN",
    "LOGOUT" = "LOGOUT",
}

export enum FriendsActions {
    "ADD" = "ADD",
    "GET" = "GET",
}

export enum ServersActions {
    "ADD2" = "ADD2",
    "GET2" = "GET2",
}

export interface LogInAction {
    action: AuthActions.LOGIN,
    payload: Pick<AppState, "user">
}

export interface LogOutAction {
    action: AuthActions.LOGOUT,
    payload: void
}

export interface AddFriendAction {
    action: FriendsActions.ADD,
    payload: InterFriends
}

export interface AddServerAction {
    action: ServersActions.ADD2,
    payload: InterServers
}


export interface GetFriendsAction {
    action: FriendsActions.GET,
    payload: InterFriends[]
}

export interface GetServersAction {
    action: ServersActions.GET2,
    payload: InterServers[]
}
export type Actions = LogInAction | LogOutAction | AddFriendAction | GetFriendsAction | AddServerAction | GetServersAction;