export type Observer = { render: () => void } & HTMLElement;
import { Server } from "./servers";
import { Screens } from "./navigation";
import { Post } from "./post";
import { User } from "./user";
import { Message } from "./message";

export type AppState = {
  Post: Post[];
  Users: User[];
  Servers: Server[];
  Messages: Message[];
  Friends: User[]
  screens: Screens;
  user: string;
  userInfo: User
  serverState: Server;
};
 
export enum UserActions {
  "SET_USER" = "SET_USER",
  "ADD_USER" = "ADD_USER",
  "GET_USERS" = "GET_USERS",
  "GET_USER" = "GET_USER",
  "EDIT" = "EDIT",
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

export enum MessageActions {
  "SAVE_MESSAGE" = "SAVE_MESSAGE",
  "GET_MESSAGE" = "GET_MESSAGE",
}


export enum NavigateActions {
  "NAVIGATE" = "NAVIGATE",
}
export enum FriendsActions {
  "ADD_FRIEND" = "ADD_FRIEND",
  "GET_FRIENDS" = "GET_FRIENDS",
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

export interface SaveMessage {
  action: MessageActions.SAVE_MESSAGE;
  payload: Message
}

export interface GetMessages {
  action: MessageActions.GET_MESSAGE;
  payload: Message[]
}

export interface SetUser{
    action: UserActions.SET_USER;
    payload: string
}

export interface GetUser{
  action: UserActions.GET_USER;
  payload: User
}

export interface AddUser {
  action: UserActions.ADD_USER,
  payload: User
}

export interface EditUser {
  action: UserActions.EDIT,
  payload: User
}

export interface GetUsers{
  action: UserActions.GET_USERS,
  payload: User[]
}

export interface AddFriendAct {
  action: FriendsActions.ADD_FRIEND,
  payload: User,
}

export interface GetFriendsAct {
  action: FriendsActions.GET_FRIENDS,
  payload: User[],
}

export type Actions = SaveServer | EditUser | GetServers | GetUser | SelectServer | SetUser | Navigate | SavePost | GetPost | SaveMessage | GetMessages | AddUser | AddFriendAct |GetFriendsAct | GetUsers ;