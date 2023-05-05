
import { InterFriends} from "./friends"
import { InterServers} from "./servers"
import { InterPost} from "./post"

export type Observer = ({ render: () => void } & HTMLElement);

export enum Screens {
    LOGIN = "LOGIN",
    SIGNUP = "SIGNUP",
    DASHBOARD = "DASHBOARD",
    HOME = "HOME",
    SERVERS = "SERVERS",
    POST = "POST",
  }
  
  
export enum NavigationActions {
    "NAVIGATE" = "NAVIGATE",
}
  
export interface NavigateAction {
    action: NavigationActions.NAVIGATE;
    payload: Screens;
}
  
export type AppState = {
    user: {
        userName: string,
        email: string,
    },
    friends: InterFriends[]
    servers: InterServers[]
    post: InterPost[]
    screen: Screens;
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

export enum PostActions {
    "AddPost" = "AddPost",
    "GetPost" = "GetPost",
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

export interface AddPostAction {
    action: PostActions.AddPost,
    payload: InterPost
}


export interface GetFriendsAction {
    action: FriendsActions.GetFriend,
    payload: InterFriends[]
}

export interface GetServersAction {
    action: ServersActions.GetServer,
    payload: InterServers[]
}

export interface GetPostAction {
    action: PostActions.GetPost,
    payload: InterPost[]
}


export type Actions = LogInAction | LogOutAction | AddFriendAction | GetFriendsAction | AddServerAction | GetServersAction | AddPostAction | GetPostAction | NavigateAction;