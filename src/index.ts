
import "./screens/Home/Home"
import "./screens/Landing/Landing"
import "./components/export"

class AppContainer extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        this.render()
    }

    render() {

        const window = this.ownerDocument.createElement('my-landing');
        this.shadowRoot?.appendChild(window);
    }
}

customElements.define('app-container', AppContainer)