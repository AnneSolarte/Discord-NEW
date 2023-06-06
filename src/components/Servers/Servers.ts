import { addObserver, appState, dispatch } from "../../store/index";
import { SaveServer, changeSelectedServer, getPosts, getServer, navigate } from "../../store/actions";
import { Screens } from "../../types/navigation";
import { Server } from "../../types/servers";

import ServerStyle from "./Servers.css";

class Servers extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this);
  }

  async connectedCallback() {
    if (!appState.Servers) {
      dispatch(await getServer());
    }

    this.render();
  }

  render() {
    const css = this.ownerDocument.createElement("style");
    css.innerHTML = ServerStyle;
    this.shadowRoot?.appendChild(css);

    const servers = this.ownerDocument.createElement("section");
    servers.className = "Servers";

    if (!appState.Servers) {
      // Mostrar un mensaje de carga o estado de espera
      const loadingMessage = this.ownerDocument.createElement("p");
      loadingMessage.innerText = "Cargando servidores...";
      servers.appendChild(loadingMessage);
    } else {
      appState.Servers.forEach((p) => {
        const serverImg = this.ownerDocument.createElement("img");
        serverImg.src = p.img;
        serverImg.className = "Icon";
        serverImg.addEventListener("click", async (e: any) => {
          const serverid = p;
          dispatch(changeSelectedServer(serverid));
          dispatch(await getPosts());
          dispatch(navigate(Screens.SERVERS));
        });
        servers.appendChild(serverImg);
      });
    }

    this.shadowRoot?.appendChild(servers);
  }
}

customElements.define("my-servers", Servers);
export default Servers;






