import { Server } from "../types/servers";
import { Actions, NavigateActions, ServerActions, UserActions, PostActions, SetUser, MessageActions, SelectServer, AddFriendAct, GetFriendsAct, FriendsActions } from "../types/store"
import firebase  from "../utils/firebase";
import { Screens } from "../types/navigation";
import { Post } from "../types/post";
import { User } from "../types/user";
import { appState } from ".";
import { Message } from "../types/message";


export const setUserCredentials =  (user: string): SetUser=>{
  return{
      action: UserActions.SET_USER,
      payload: user,
  }
}

export const addUser = async (user: User): Promise<Actions> =>{
  await firebase.AddUserDB(user)
  return{
      action: UserActions.ADD_USER,
      payload: user,
  }
}

export const SaveServer = async (server: Server): Promise<Actions>=>{
  await firebase.SaveServerDB(server);
  return{
      action: ServerActions.SAVE_SERVER,
      payload: server,
  }
}

export const getServer = async(): Promise<Actions>=>{
  console.log("Entrando en getServer() actions")
    const Server = await firebase.GetServerDB();
    return{
        action: ServerActions.GET_SERVERS,
        payload: Server,
    }
}

export const SavePost = async (post: Post, serverId: string): Promise<Actions> => {
  await firebase.SavePostDB(post, serverId);
  return {
    action: PostActions.SAVE_POST,
    payload: post,
  };
};

export const getPosts = async (): Promise<Actions> => {
  const posts = await firebase.GetPostDB(appState.serverState.id);
  return {
    action: PostActions.GET_POST,
    payload: posts,
  };
};

export const SaveMessage = async (message: Message, serverId: string): Promise<Actions> => {
  await firebase.SaveMessageDB(message, serverId);
  return {
    action: MessageActions.SAVE_MESSAGE,
    payload: message,
  };
};

export const GetMessages = async (): Promise<Actions> => {
  const messages = await firebase.GetMessagesDB(appState.serverState.id);
  return {
    action: MessageActions.GET_MESSAGE,
    payload: messages,
  };
};

export const navigate = (screen: Screens) => {
    return {
      action: NavigateActions.NAVIGATE,
      payload: screen,
    };
  };

export const changeSelectedServer = (server: Server): SelectServer => {
  return {
    action: ServerActions.CHANGE_SELECTED_SERVER,
    payload: server,
  };
};

export const AddFriend = async (friend:User): Promise<AddFriendAct> =>{

  console.log(friend)
  await firebase.AddFriendDB(friend)

  return{
      action: FriendsActions.ADD_FRIEND,
      payload: friend,
  }
}

export const GetFriends = async (): Promise<GetFriendsAct> =>{

  const friends = await firebase.GetFriendsDB()

  return{
      action: FriendsActions.GET_FRIENDS,
      payload: friends,
  }
}