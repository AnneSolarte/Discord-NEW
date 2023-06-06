import { Server } from "../types/servers";
import { Actions, NavigateActions, ServerActions, UserActions, PostActions, SetUser, AddUser, SelectServer } from "../types/store"
import firebase  from "../utils/firebase";
import { Screens } from "../types/navigation";
import { Post } from "../types/post";
import { User } from "../types/user";


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
  const posts = await firebase.GetPostDB();
  return {
    action: PostActions.GET_POST,
    payload: posts,
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