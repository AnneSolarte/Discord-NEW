
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
    "AddFriend" = "AddFriend",
    "GetFriend" = "GetFriend",
}

export enum ServersActions {
    "AddServer" = "AddServer",
    "GetServer" = "GetServer",
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
    action: FriendsActions.AddFriend,
    payload: InterFriends
}

export interface AddServerAction {
    action: ServersActions.AddServer,
    payload: InterServers
}


export interface GetFriendsAction {
    action: FriendsActions.GetFriend,
    payload: InterFriends[]
}

export interface GetServersAction {
    action: ServersActions.GetServer,
    payload: InterServers[]
}


export type Actions = LogInAction | LogOutAction | AddFriendAction | GetFriendsAction | AddServerAction | GetServersAction;