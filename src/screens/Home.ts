import styles from "./styles.css";

import { ServerAtt } from "../components/Servers/Servers";
import { FriendsOnAtt } from "../components/FriendsOnline/FriendsOnline";
import { FriendsAtt } from "../components/Friends/Friends";
import { getFriends } from "../store/actions";
import { getServers} from "../store/actions";
import { addObserver, appState, dispatch } from "../store/index";

class Home extends HTMLElement {
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
    
  }
}

customElements.define("my-home", Home);
