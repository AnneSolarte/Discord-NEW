
import { navigate } from "../../store/actions";
import { addObserver, appState, dispatch } from "../../store/index";
import { Screens } from "../../types/navigation";

import ButtonSignStyle from "./ButtonSign.css"
class ButtonSign extends HTMLElement {
    button?: HTMLElement;

    onButtonClicked() {
        this.render();
    }

    connectedCallback(){
        this.render();
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        addObserver(this);

        this.button = this.ownerDocument.createElement('button');
        this.button.className = "ButtonSign"
        this.button.textContent = 'Sign Up';
        this.button.addEventListener("click", () => {
            dispatch(navigate(Screens.HOME));
        });
    }

    render() {
        
        this.shadowRoot?.appendChild(this.button!);

        const css = this.ownerDocument.createElement("style");
        css.innerHTML = ButtonSignStyle;
        this.shadowRoot?.appendChild(css);
        
    }
}

customElements.define("button-sign", ButtonSign);
export default ButtonSign;