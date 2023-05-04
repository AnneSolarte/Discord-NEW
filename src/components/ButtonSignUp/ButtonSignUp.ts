
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

        this.button = this.ownerDocument.createElement('button');
        this.button.className = "ButtonSignUp"
        this.button.textContent = 'Login';
        this.button.addEventListener("click",this.onButtonClicked);
    }

    render() {
        
        this.shadowRoot?.appendChild(this.button!);

        const css = this.ownerDocument.createElement("style");
        css.innerHTML = ButtonSignUpStyle;
        this.shadowRoot?.appendChild(css);
        
    }
}

customElements.define("button-login", ButtonSignUp);
export default ButtonSignUp;