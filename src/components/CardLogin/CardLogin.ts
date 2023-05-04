
import CardLoginStyle from "./CardLogin.css"
import ButtonSignUp from "../../components/ButtonSignUp/ButtonSignUp";
import ButtonLogin from "../../components/ButtonLogin/ButtonLogin";
import InputEmail  from "../../components/InputEmail/InputEmail";
import InputPassword from "../../components/InputPassword/InputPassword";

class CardLogin extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }
    
    render() {

            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = `
                <div class="CardLogin">
                    <img src="/img/arrow_left.png">
                    <div>
                        <h3>¡Hi begginer!</h3>
                        <p>We are glad to meet you ;)</p>
                    </div>
                    <InputUserName></InputUserName>
                    <InputLogin></InputLogin>
                    <InputSignUp></InputSignUp>
                    <p>Birthday</p>
                    <div>
                        <FormDia></FormDia>
                        <FormMes></FormMes>
                        <FormAno></FormAno>
                    </div>
                    <input type="checkbox" id="checkbox">
                    <p>I agree to receive emails with Discord updates, tips and special offers. You can revoke consent at any time</p>
                    <button-signup></button-signup>

                    <div>
                        <p>Do you already have an account?</p>
                        <p>Login</p>
                    </div>
                </div>
                `;
            }

            const css = this.ownerDocument.createElement("style");
            css.innerHTML = CardLoginStyle;
            this.shadowRoot?.appendChild(css);

            
        }
}

customElements.define("card-login", CardLogin);
export default CardLogin;