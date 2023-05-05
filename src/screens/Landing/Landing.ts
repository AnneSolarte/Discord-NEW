
import LandingStyle from "./Landing.css";

import MyBar from "../../components/barLanding/MyBar"
import { addObserver, appState, dispatch } from "../../store/index";
import LandingText from "../../components/LandingText/LandingText";
import { getPosts } from "../../store/actions";
import { getFriends } from "../../store/actions";
import { getServers} from "../../store/actions";
import ButtonSignUp from "../../components/ButtonSignUp/ButtonSignUp";
import ButtonLogin from "../../components/ButtonLogin/ButtonLogin";

export default class Landing extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this);
  }

  async connectedCallback() {
    if (appState.friends.length === 0) {
      const action = await getFriends();
      dispatch(action);
    } if (appState.servers.length === 0) {
      const actions = await getServers();
      dispatch(actions);
    } if (appState.post.length === 0) {
      const actions = await getPosts();
      dispatch(actions);
    } else {
      this.render();
    }
  }

  render() {
    
    if (this.shadowRoot) {
        this.shadowRoot.innerHTML = ``;

        
      
        const css = this.ownerDocument.createElement("style");
        css.innerHTML = LandingStyle;
        this.shadowRoot?.appendChild(css);
    }

    const container = this.ownerDocument.createElement("section")
    container.className = 'container'
    
    const myBar = this.ownerDocument.createElement("my-bar") as MyBar;
    container.appendChild(myBar);


    const landingText = this.ownerDocument.createElement("landing-text") as LandingText;
    container.appendChild(landingText);


    const buttons = this.ownerDocument.createElement("section")
    buttons.className = "buttonsSection"

    const buttonLogin = this.ownerDocument.createElement("button-login") as ButtonLogin;
    buttons.appendChild(buttonLogin);

    const buttonSignUp = this.ownerDocument.createElement("button-signup") as ButtonSignUp;
    buttons.appendChild(buttonSignUp);

    container.appendChild(buttons);

    this.shadowRoot?.appendChild(container);


  }
}

customElements.define("landing-channel", Landing);