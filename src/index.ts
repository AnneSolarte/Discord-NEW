
import "./screens/export"
import "./components/export"
import { addObserver, appState} from "./store/index";
import { Screens } from "./types/navigation";

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
            login.innerText = "My Login";
            this.shadowRoot?.appendChild(login);
            break;
    
          case Screens.SIGNUP:
            const signup = this.ownerDocument.createElement("signup-channel");
            signup.innerText = "My SignUp";
            this.shadowRoot?.appendChild(signup);
            break;
    
          case Screens.DASHBOARD:
            const dashboard = this.ownerDocument.createElement("landing-channel");
            dashboard.innerText = "My Landing";
            this.shadowRoot?.appendChild(dashboard);
            break;

        case Screens.HOME:
            const home = this.ownerDocument.createElement("my-home");
            home.innerText = "My home";
            this.shadowRoot?.appendChild(home);
            break;

        case Screens.SERVERS:
            const servers = this.ownerDocument.createElement("servers-channel");
            servers.innerText = "My home";
            this.shadowRoot?.appendChild(servers);
            break;

        case Screens.POST:
            const post = this.ownerDocument.createElement("post-channel");
            post.innerText = "My Posts";
            this.shadowRoot?.appendChild(post);
            break;
    
          default:
            break;
        }
      }
}

customElements.define('app-container', AppContainer)