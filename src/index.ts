
import "./screens/export"
import "./components/export"
import { navigate } from "./store/actions";
import { addObserver, appState, dispatch } from "./store/index";
import { Screens } from "./types/store";

class AppContainer extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: "open"})
        addObserver(this);
    }

    connectedCallback() {
        this.render()
    }

    render() {
        if (this.shadowRoot) this.shadowRoot.innerHTML = "";
    
        switch (appState.screen) {
          case Screens.LOGIN:
            const login = this.ownerDocument.createElement("login-channel");
            login.innerText = "esta es la pantalla de login";
            this.shadowRoot?.appendChild(login);
            break;
    
          case Screens.SIGNUP:
            const signup = this.ownerDocument.createElement("signup-channel");
            signup.innerText = "esta es la pantalla de signup";
            this.shadowRoot?.appendChild(signup);
            break;
    
          case Screens.DASHBOARD:
            const dashboard = this.ownerDocument.createElement("landing-channel");
            dashboard.innerText = "este es la pantalla de dashboard";
            this.shadowRoot?.appendChild(dashboard);
            break;

        case Screens.HOME:
            const home = this.ownerDocument.createElement("my-home");
            home.innerText = "este es la pantalla de dashboard";
            this.shadowRoot?.appendChild(home);
            break;
    
          default:
            break;
        }
      }
}

customElements.define('app-container', AppContainer)