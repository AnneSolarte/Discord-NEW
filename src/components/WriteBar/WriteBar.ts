
import WriteBarStyle from "./WriteBar.css"
import { Message } from "../../types/message";
import firebase from "../../utils/firebase";
import { appState, dispatch } from "../../store";
import { SaveMessage, SavePost, navigate } from "../../store/actions";
import { Screens } from "../../types/navigation";

const messForm: Message = {
    id: "",
    img: "",
    userImg: appState.userInfo.img,
    Username: appState.userInfo.userName,
    message: "",
    createdAt: ""
}

class WriteBar extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }
    
    render() {
            const css = this.ownerDocument.createElement("style");
            css.innerHTML = WriteBarStyle;
            this.shadowRoot?.appendChild(css);

            const WriteBar = this.ownerDocument.createElement("section");
            WriteBar.className = "WriteBar";

            const upload_icon = this.ownerDocument.createElement("img");
            upload_icon.className = "friendsIcon1";
            upload_icon.src = "/img/upload_icon.png"

            const inputImg = this.ownerDocument.createElement("input");
            inputImg.className = "inputImg";
            inputImg.type = "file"
            inputImg.addEventListener("change", async () =>{
                const file =  inputImg.files?.[0];
                if (file) await firebase.uploadFile(file);
                console.log(file?.name);
                if (file) {
                  const img = await firebase.getFile(file.name);
                  console.log("img", img);
                  const src = String(img)
                  messForm.img = src
              }
              });


            const inputText = this.ownerDocument.createElement("input");
            inputText.className = "inputText";
            inputText.addEventListener("change", async (e:any)=>{
                messForm.message = e?.target?.value
                inputText.addEventListener("keyup", async (e:any)=> {
                    if (e.code === 'Enter') {
                        console.log(messForm)
                        dispatch(await SaveMessage(messForm, appState.serverState.id))
                    }
                });
            })

            const blockIcons = this.ownerDocument.createElement("section");
            blockIcons.className = "blockIcons";

            const gift_icon = this.ownerDocument.createElement("img");
            gift_icon.className = "Icons";
            gift_icon.src = "/img/gift_icon.png"

            const gif_icon = this.ownerDocument.createElement("img");
            gif_icon.className = "Icons";
            gif_icon.src = "/img/gif_icon.png"

            const doc_icon = this.ownerDocument.createElement("img");
            doc_icon.className = "Icons";
            doc_icon.src = "/img/doc_icon.png"

            const emoji_icon = this.ownerDocument.createElement("img");
            emoji_icon.className = "Icons";
            emoji_icon.src = "/img/emoji_icon.png"

            WriteBar.appendChild(upload_icon);
            WriteBar.appendChild(inputImg);
            WriteBar.appendChild(inputText);
            blockIcons.appendChild(gift_icon);
            blockIcons.appendChild(gif_icon);
            blockIcons.appendChild(doc_icon);
            blockIcons.appendChild(emoji_icon);
            WriteBar.appendChild(blockIcons);

            this.shadowRoot?.appendChild(WriteBar);
        }
}

customElements.define("write-bar", WriteBar);
export default WriteBar;