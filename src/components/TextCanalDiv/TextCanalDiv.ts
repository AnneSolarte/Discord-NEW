import { dispatch } from "../../store";
import { navigate } from "../../store/actions";
import { Screens } from "../../types/navigation";
import TextCanalDivStyle from "./TextCanalDiv.css"

class TextCanalDiv extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    
    render() {
            const css = this.ownerDocument.createElement("style");
            css.innerHTML = TextCanalDivStyle;
            this.shadowRoot?.appendChild(css);

            const TextCanalDiv = this.ownerDocument.createElement("section");
            TextCanalDiv.className = "TextCanalDiv"
            TextCanalDiv.addEventListener("click", () =>{
                TextCanalDiv.classList.remove('backgroundNone');
                ForumCanalDiv.classList.remove('backgroundFlex');
                dispatch(navigate(Screens.SERVERS))
            });

            const iconText =  this.ownerDocument.createElement("img");
            iconText.className = "Icon"
            iconText.src= "/img/numeral.png"

            const canal =  this.ownerDocument.createElement("p");
            canal.className = "text"
            canal.textContent = "General"

            const ForumCanalDiv = this.ownerDocument.createElement("section");
            ForumCanalDiv.className = "ForumCanalDiv"
            ForumCanalDiv.addEventListener("click", () =>{
                TextCanalDiv.classList.add('backgroundNone');
                ForumCanalDiv.classList.add('backgroundFlex');
                dispatch(navigate(Screens.POST))
            });

            const iconForum =  this.ownerDocument.createElement("img");
            iconForum.className = "Icon"
            iconForum.src= "/img/Forum_icon.png"

            const canalF =  this.ownerDocument.createElement("p");
            canalF.className = "text"
            canalF.textContent = "Forum"
            

            TextCanalDiv.appendChild(iconText)
            TextCanalDiv.appendChild(canal)

            ForumCanalDiv.appendChild(iconForum)
            ForumCanalDiv.appendChild(canalF)
            
            this.shadowRoot?.appendChild(ForumCanalDiv)
            this.shadowRoot?.appendChild(TextCanalDiv);
            
        }
}

customElements.define("text-canal", TextCanalDiv);
export default TextCanalDiv;