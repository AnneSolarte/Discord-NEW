
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
    
        switch (appState.screens) {
          case Screens.LOGIN:
            const login = this.ownerDocument.createElement("login-channel");
            this.shadowRoot?.appendChild(login);
            break;
    
          case Screens.SIGNUP:
            const signup = this.ownerDocument.createElement("signup-channel");
            this.shadowRoot?.appendChild(signup);
            break;
    
          case Screens.DASHBOARD:
            const dashboard = this.ownerDocument.createElement("landing-channel");
            this.shadowRoot?.appendChild(dashboard);
            break;

        case Screens.HOME:
            const home = this.ownerDocument.createElement("my-home");
            this.shadowRoot?.appendChild(home);
            break;

        case Screens.SERVERS:
            const servers = this.ownerDocument.createElement("servers-channel");
            this.shadowRoot?.appendChild(servers);
            break;

        case Screens.POST:
            const post = this.ownerDocument.createElement("post-channel");
            this.shadowRoot?.appendChild(post);
            break;

        case Screens.POSTCREATE:
            const postCreate = this.ownerDocument.createElement("postcreate-channel");
            this.shadowRoot?.appendChild(postCreate);
            break;
        
        case Screens.AddFRIENDS:
            const addFrriends = this.ownerDocument.createElement("add-friends");
            this.shadowRoot?.appendChild(addFrriends);
            break;
    
          default:
            break;
        }
      }
}

customElements.define('app-container', AppContainer)