import FriendsOnDivStyle from "./FriendsOnDiv.css"

class FriendsOnDiv extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }
    
    render() {
            if(this.shadowRoot){
            this.shadowRoot.innerHTML=""

            const css = this.ownerDocument.createElement("style");
            css.innerHTML = FriendsOnDivStyle;
            this.shadowRoot?.appendChild(css);

            this.shadowRoot.innerHTML+=`
            <div class="Section3Div">
            <div class="section3Bar">
                <img class="friendsIcon2" src="/img/friends.png">
                <p>Friends</p>
                <img id="lineVertImg" src="/img/LineVertical.png">
                <p class="block" id="blockGray">All</p>
                <p class="block" >Pending</p>
                <p class="block" id="blockBlue">Add Friend</p>
            </div>

            </div>
            <div class="SectionList">
                <p class="searchBar">Search<img src=""></p>
                <p>ONLINE --</p>
            </div>
              `;
            }
            
        }
}

customElements.define("friends-ondiv", FriendsOnDiv);
export default FriendsOnDiv;