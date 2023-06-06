
import { appState, dispatch } from "../../store";
import { GetFriends } from "../../store/actions";
import FriendStyle from "./FriendStyle.css"


class Friends extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        if(appState.Friends.length ===0){
            dispatch(await GetFriends())
            this.render();
        }else{
            this.render()
        }
    }

    render() {

            const css = this.ownerDocument.createElement("style");
            css.innerHTML = FriendStyle;
            this.shadowRoot?.appendChild(css);

            appState.Friends.forEach((p) => {
                const FriendsDiv = this.ownerDocument.createElement("section");
                FriendsDiv.className = "FriendsDiv";

                const uImg = this.ownerDocument.createElement("img");
                uImg.className = "friendsImg";
                uImg.src = p.img;

                const userN = this.ownerDocument.createElement("p");
                userN.className = "FriendsName";
                userN.innerText = p.userName;

                FriendsDiv.appendChild(uImg)
                FriendsDiv.appendChild(userN)
              });
            
        }
}

customElements.define("my-friends", Friends);
export default Friends;