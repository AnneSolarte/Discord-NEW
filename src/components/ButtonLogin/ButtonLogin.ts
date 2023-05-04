
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
        this.button.addEventListener("click",this.onButtonClicked);
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