export type Observer = { render: () => void } & HTMLElement;
import { Server } from "./servers";
import { Screens } from "./navigation";
import { User } from "../components/export";

export type AppState = {
  Servers: Server[];
  screens: Screens;
  user: string;
};
 
export enum UserActions {
    "SET_USER" = "SET_USER",
}


export enum ServerActions {
  "SAVE_SERVER" = "SAVE_SERVER",
  "GET_SERVERS" = "GET_SERVERS",
}

export enum NavigateActions {
  "NAVIGATE" = "NAVIGATE",
}

export interface Navigate {
  action: NavigateActions.NAVIGATE;
  payload: Screens
}

export interface SaveServer {
  action: ServerActions.SAVE_SERVER;
  payload: Server
}

export interface GetServers {
  action: ServerActions.GET_SERVERS;
  payload: Server[]
}
export interface SetUser{
    action: UserActions.SET_USER;
    payload: string
}

export type Actions = SaveServer | GetServers | SetUser |Navigate;