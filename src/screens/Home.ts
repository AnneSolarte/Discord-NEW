import styles from "./styles.css";

import Servers, { ServerAtt } from "../components/Servers/Servers";
import FriendsOnline, { FriendsOnAtt } from "../components/FriendsOnline/FriendsOnline";
import Friends, { FriendsAtt } from "../components/Friends/Friends";
import { getFriends } from "../store/actions";
import { getServers} from "../store/actions";
import { addObserver, appState, dispatch } from "../store/index";

class Home extends HTMLElement {
  ServersList: Servers[] = [];
  FriendsList: Friends[] = [];
  FriendsOnList: FriendsOnline[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this);
  }

  async connectedCallback() {
    if (appState.friends.length === 0) {
      const action = await getFriends();
      dispatch(action);
    } else {
      this.render();
    }

    if (appState.servers.length === 0) {
      const actions = await getServers();
      dispatch(actions);
    } else {
      this.render();
    }
  }

  render() {

    appState.servers.forEach((data) => {
      const ServersCard = this.ownerDocument.createElement("my-servers") as Servers;
          ServersCard.setAttribute(ServerAtt.img, data.img);
          this.ServersList.push(ServersCard);
  });

  const ServersCards = this.ownerDocument.createElement("div")
  ServersCards.className = 'ServerSection'
  this.ServersList.forEach((ServersCard) => {
      ServersCards.appendChild(ServersCard)
  });
  this.shadowRoot?.appendChild(ServersCards);

  appState.friends.forEach((data) => {
    const FriendsCard = this.ownerDocument.createElement("my-friends") as Friends;
        FriendsCard.setAttribute(FriendsAtt.img, data.img);
        FriendsCard.setAttribute(FriendsAtt.name, data.name);
        FriendsCard.setAttribute(FriendsAtt.mood, data.mood);
        this.FriendsList.push(FriendsCard);
});

  const FriendsCards = this.ownerDocument.createElement("div")
  FriendsCards.className = 'FriendSection'
  this.FriendsList.forEach((FriendsCard) => {
      FriendsCards.appendChild(FriendsCard)
  });
  this.shadowRoot?.appendChild(FriendsCards);



  }
}

customElements.define("my-home", Home);
