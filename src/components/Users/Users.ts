
import { appState, dispatch } from "../../store";
import { GetUsers, getPosts } from "../../store/actions";
import Userstyle from "./Userstyle.css"


class Users extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        if (appState.Users.length === 0) {
          console.log("Haciendo petición firebase");
          dispatch(await GetUsers());
        }
        this.render();
    }

    render() {

            const css = this.ownerDocument.createElement("style");
            css.innerHTML = Userstyle;
            this.shadowRoot?.appendChild(css);
            
            const container = this.ownerDocument.createElement("section");
            container.className = "container";

            appState.Users.forEach((p) => {
                const UsersDiv = this.ownerDocument.createElement("section");
                UsersDiv.className = "UsersDiv";

                const uImg = this.ownerDocument.createElement("img");
                uImg.className = "UsersImg";
                uImg.src = p.img;

                const userN = this.ownerDocument.createElement("p");
                userN.className = "UsersName";
                userN.innerText = p.userName;

                UsersDiv.appendChild(uImg)
                UsersDiv.appendChild(userN)
                container.appendChild(UsersDiv)
                
              });

              this.shadowRoot?.appendChild(container); 
        }
}

customElements.define("users-list", Users);
export default Users;