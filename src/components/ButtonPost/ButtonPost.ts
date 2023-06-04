
import ButtonPostStyle from "./ButtonPost.css"
import { dispatch } from "../../store";
import { navigate } from "../../store/actions";
import { Screens } from "../../types/navigation";

class ButtonPost extends HTMLElement {
    button?: HTMLElement;

    onButtonClicked() {
        dispatch(navigate(Screens.POSTCREATE));
    }

    connectedCallback(){
        this.render();
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.button = this.ownerDocument.createElement('button');
        this.button.className = "ButtonPost"
        this.button.textContent = 'New Post';
        this.button.addEventListener("click",this.onButtonClicked);
    }

    render() {
        
        this.shadowRoot?.appendChild(this.button!);

        const css = this.ownerDocument.createElement("style");
        css.innerHTML = ButtonPostStyle;
        this.shadowRoot?.appendChild(css);
        
    }
}

customElements.define("button-post", ButtonPost);
export default ButtonPost;