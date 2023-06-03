import { Server } from "../types/servers";
import { Actions, NavigateActions, ServerActions, UserActions } from "../types/store"
import firebase  from "../utils/firebase";
import { Screens } from "../types/navigation";

export const SaveServer = async (server: Server): Promise<Actions>=>{
    await firebase.SaveServerDB(server);
    return{
        action: ServerActions.SAVE_SERVER,
        payload: server,
    }
}

export const setUserCredentials = (user: string) => {
  return {
    action: UserActions.SET_USER,
    payload: user,
  };
};

export const getServer = async(): Promise<Actions>=>{
    const Server = await firebase.GetServerDB();
    return{
        action: ServerActions.GET_SERVERS,
        payload: Server,
    }
}
export const navigate = (screen: Screens) => {
    return {
      action: NavigateActions.NAVIGATE,
      payload: screen,
    };
  };