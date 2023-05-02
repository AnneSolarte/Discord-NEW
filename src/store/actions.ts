import Friends from '../services/friends'
import Servers from '../services/servers'
import { AddFriendAction, AuthActions, GetFriendsAction, LogInAction, LogOutAction, FriendsActions, AddServerAction, GetServersAction, ServersActions } from "../types/store"


export const logOut = (): LogOutAction => {
    return {
        action: AuthActions.LOGOUT,
        payload: undefined
    }
}

export const logIn = ({payload}: Pick<LogInAction, "payload">): LogInAction => {
    return {
        action: AuthActions.LOGIN,
        payload
    }
}

export const getFriends = async (): Promise<GetFriendsAction> => {
    const friends = await Friends.get();
    console.log('friends',friends);
    return {
        action: FriendsActions.GetFriend,
        payload: friends
    }
}

export const getServers = async (): Promise<GetServersAction> => {
    const servers = await Servers.get();
    console.log('servers',servers);
    return {
        action: ServersActions.GetServer,
        payload: servers
    }
}

export const addNewFriend = ({payload}: Pick<AddFriendAction, "payload">): AddFriendAction => {
    return {
        action: FriendsActions.AddFriend,
        payload
    }
}

export const addNewServer = ({payload}: Pick<AddServerAction, "payload">): AddServerAction => {
    return {
        action: ServersActions.AddServer,
        payload
    }
}
