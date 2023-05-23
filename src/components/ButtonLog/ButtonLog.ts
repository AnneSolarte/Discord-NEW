import ButtonLogStyle from "./ButtonLog.css"
class ButtonLog extends HTMLElement {
    button?: HTMLElement;

    connectedCallback(){
        this.render();
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.button = this.ownerDocument.createElement('button');
        this.button.className = "ButtonLog"
        this.button.textContent = 'Login';
    }

    render() {
        
        this.shadowRoot?.appendChild(this.button!);

        const css = this.ownerDocument.createElement("style");
        css.innerHTML = ButtonLogStyle;
        this.shadowRoot?.appendChild(css);
        
    }
}

customElements.define("button-log", ButtonLog);
export default ButtonLog;