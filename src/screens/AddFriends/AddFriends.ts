import AddFriendsStyle from "./AddFriends.css";

import User from "../../components/User/user"
import FriendsDiv from "../../components/FriendsDiv/FriendsDiv";
import FriendsOnDiv from "../../components/FriendsOnDiv/FriendsOnDiv";
import { Friends, ServersSect } from "../../components/export";
import { addObserver, appState, dispatch } from "../../store/index";
import { AddFriend } from "../../store/actions";


export default class AddFriends extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this);
  }

  async connectedCallback() {
    this.render()
  }


  async render() {
    if (this.shadowRoot) {
        this.shadowRoot.innerHTML = ``;
      
        const css = this.ownerDocument.createElement("style");
        css.innerHTML = AddFriendsStyle;
        this.shadowRoot?.appendChild(css);   
    }

    const section1 = this.ownerDocument.createElement("section")
    section1.className = 'Section1'

    const ServersDiv = this.ownerDocument.createElement("servers-sect") as ServersSect;
    section1.appendChild(ServersDiv)

    this.shadowRoot?.appendChild(section1);

    const section2 = this.ownerDocument.createElement("section")
    section2.className = 'Section2'

    const FriendsDiv = this.ownerDocument.createElement("friends-div") as FriendsDiv;
    section2.appendChild(FriendsDiv)

    const Friends = this.ownerDocument.createElement("section")
    Friends.className = "FriendsSection"

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
      Friends.appendChild(FriendsDiv)
    });

    section2.appendChild(Friends)
    
    this.shadowRoot?.appendChild(section2);

    const section3 = this.ownerDocument.createElement("section")
    section3.className = 'Section3'
    
    
    const friendsOnDiv = this.ownerDocument.createElement("friends-ondiv") as FriendsOnDiv;
    section3.appendChild(friendsOnDiv)

    appState.Users.forEach((p) => {
      const UsersDiv = this.ownerDocument.createElement("section");
      UsersDiv.className = "UsersDiv";

      const uImg = this.ownerDocument.createElement("img");
      uImg.className = "UsersImg";
      uImg.src = p.img;

      const userN = this.ownerDocument.createElement("p");
      userN.className = "UsersName";
      userN.innerText = p.userName;
      
      const addFriendBtn = this.ownerDocument.createElement("button")
      addFriendBtn.innerText = "Add friend"
      addFriendBtn.className = "addFriendBtn"
      addFriendBtn.addEventListener("click", async (e: any) => {
        dispatch(await AddFriend(p));

      });

      UsersDiv.appendChild(uImg)
      UsersDiv.appendChild(userN)
      UsersDiv.appendChild(addFriendBtn)
      section3.appendChild(UsersDiv)
      
    });

    const section4 = this.ownerDocument.createElement("section")
    section4.className = 'Section4'
    const user = this.ownerDocument.createElement("my-user") as User;
    section4.appendChild(user)

    this.shadowRoot?.appendChild(section3);
    this.shadowRoot?.appendChild(section4);
  }
}

customElements.define("add-friends", AddFriends);
