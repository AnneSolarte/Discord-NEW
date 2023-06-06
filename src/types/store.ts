export type Observer = { render: () => void } & HTMLElement;
import { Server } from "./servers";
import { Screens } from "./navigation";
import { Post } from "./post";
import { User } from "./user";

export type AppState = {
  Post: Post[];
  Servers: Server[];
  Friends: User[]
  screens: Screens;
  user: string;
  userInfo: User
  serverState: Server;
};
 
export enum UserActions {
  "SET_USER" = "SET_USER",
  "ADD_USER" = "ADD_USER",
}


export enum ServerActions {
  "SAVE_SERVER" = "SAVE_SERVER",
  "GET_SERVERS" = "GET_SERVERS",
  "CHANGE_SELECTED_SERVER" = "CHANGE_SELECTED_SERVER"
}
export enum PostActions {
  "SAVE_POST" = "SAVE_POST",
  "GET_POST" = "GET_POST",
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

export interface SelectServer {
  action: ServerActions.CHANGE_SELECTED_SERVER;
  payload: Server;
}

export interface GetServers {
  action: ServerActions.GET_SERVERS;
  payload: Server[]
}

export interface SavePost {
  action: PostActions.SAVE_POST;
  payload: Post
}

export interface GetPost {
  action: PostActions.GET_POST;
  payload: Post[]
}

export interface SetUser{
    action: UserActions.SET_USER;
    payload: string
}

export interface AddUser {
  action: UserActions.ADD_USER,
  payload: User
}

export type Actions = SaveServer | GetServers | SelectServer | SetUser | Navigate | SavePost | GetPost | AddUser;