import MessageCardStyle from "./MessageCard.css";
import { appState, addObserver } from "../../store";
import { dispatch } from "../../store";
import {  GetMessages } from "../../store/actions";


class MessageCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this);
  }

  async connectedCallback() {
    this.render();
  }

  render() {
    const container = this.ownerDocument.createElement("section");
    container.className = "MessageCards";

    const css = this.ownerDocument.createElement("style");
    css.innerHTML = MessageCardStyle;
    this.shadowRoot?.appendChild(css);


    appState.Messages.forEach((p) => {
        const MessageCard = this.ownerDocument.createElement("section");
        MessageCard.className = "MessageCard";

        const Upsection = this.ownerDocument.createElement("section");
        Upsection.className = "Upsection";

        const uImg = this.ownerDocument.createElement("img");
        uImg.className = "userImg";
        uImg.src = p.userImg;

        const Namesection = this.ownerDocument.createElement("section");
        Namesection.className = "Namesection";

        const userN = this.ownerDocument.createElement("p");
        userN.className = "userName";
        userN.innerText = p.Username;

        const CreatedAt = this.ownerDocument.createElement("p");
        CreatedAt.className = "time";
        CreatedAt.innerText = String(new Date(Number(p.createdAt) * 1000));

        const textsection = this.ownerDocument.createElement("section");
        textsection.className = "textsection";

        const Message = this.ownerDocument.createElement("p");
        Message.className = "message";
        Message.innerText = p.message;

        const Image = this.ownerDocument.createElement("img");
        Image.className = "img";
        Image.src = p.img;

        Upsection.appendChild(uImg);
        Namesection.appendChild(userN);
        Namesection.appendChild(CreatedAt);
        textsection.appendChild(Namesection)
        textsection.appendChild(Message)
        Upsection.appendChild(textsection);
        MessageCard.appendChild(Upsection);
        MessageCard.appendChild(Image);

        container.appendChild(MessageCard);
      });
      this.shadowRoot?.appendChild(container);
    }

    

}

customElements.define("message-card", MessageCard);
export default MessageCard;