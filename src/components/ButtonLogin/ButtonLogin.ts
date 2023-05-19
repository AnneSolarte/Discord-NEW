
import { navigate } from "../../store/actions";
import { addObserver, appState, dispatch } from "../../store/index";
import { Screens } from "../../types/navigation";

import ButtonLoginStyle from "./ButtonLogin.css"
class ButtonLogin extends HTMLElement {
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

        this.button = this.ownerDocument.createElement('button');
        this.button.className = "buttonLogin"
        this.button.textContent = 'Login';
        this.button.addEventListener("click", () => {
            dispatch(navigate(Screens.LOGIN));
        });
    }

    render() {
        
        this.shadowRoot?.appendChild(this.button!);

        const css = this.ownerDocument.createElement("style");
        css.innerHTML = ButtonLoginStyle;
        this.shadowRoot?.appendChild(css);
        
    }
}

customElements.define("button-login", ButtonLogin);
export default ButtonLogin;