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

        this.button = this.ownerDocument.createElement('button');
        this.button.className = "ButtonSign"
        this.button.textContent = 'Sign Up';
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