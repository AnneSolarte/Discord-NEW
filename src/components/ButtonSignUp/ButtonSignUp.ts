import { navigate } from "../../store/actions";
import { addObserver, appState, dispatch } from "../../store/index";
import { Screens } from "../../types/store";

import ButtonSignUpStyle from "./ButtonSignUp.css"
class ButtonSignUp extends HTMLElement {
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
        this.button.className = "ButtonSignUp"
        this.button.textContent = 'SignUp';
        this.button.addEventListener("click", () => {
            dispatch(navigate(Screens.LOGIN));
          });
    }

    render() {
        
        this.shadowRoot?.appendChild(this.button!);

        

        const css = this.ownerDocument.createElement("style");
        css.innerHTML = ButtonSignUpStyle;
        this.shadowRoot?.appendChild(css);
        
    }
}

customElements.define("button-signup", ButtonSignUp);
export default ButtonSignUp;