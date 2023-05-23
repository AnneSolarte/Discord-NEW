import SignUpStyle from "./SignUp.css"
import LoginDiv from "../../components/LoginDiv/LoginDiv";
import DescriptionCardLogin  from "../../components/DescriptionCardSignUp/DescriptionCardSignUp";
import CheckBoxLogin from "../../components/CheckBoxLogin/CheckBoxLogin";
import ButtonSign from "../../components/ButtonSign/ButtonSign";
import { addObserver, appState, dispatch } from "../../store/index";
import { navigate } from "../../store/actions";
import { Screens } from "../../types/navigation";
import Firebase from "../../utils/firebase";

const credentials = { email: "", password: "", día: "", mes: "", año: "", CheckBox: false };

export default class SignUp extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this);
  }

  connectedCallback() {
    this.render();
  }

  async handleSignUpButton() {
    Firebase.registerUser(credentials);
    dispatch(navigate(Screens.LOGIN));
  }

  render() {
    
    if (this.shadowRoot) {
        this.shadowRoot.innerHTML = ``;
      
        const css = this.ownerDocument.createElement("style");
        css.innerHTML = SignUpStyle;
        this.shadowRoot?.appendChild(css);
    }

    const container = this.ownerDocument.createElement("section")
    container.className = 'container'

    const SignUpCard = this.ownerDocument.createElement("section")
    SignUpCard.className = 'SignUpCard'

    const loginDiv = this.ownerDocument.createElement("login-div") as LoginDiv;
    SignUpCard.appendChild(loginDiv)
    this.shadowRoot?.appendChild(SignUpCard);

    const InputSection = this.ownerDocument.createElement("section")
    InputSection.className = 'BigInputSection'

    const email = this.ownerDocument.createElement("input");
    email.placeholder = "Email";
    email.className = "BigInput"
    email.type = "email";
    email.addEventListener(
      "change",
      (e: any) => (credentials.email = e.target.value)
    );
    InputSection.appendChild(email);

    const password = this.ownerDocument.createElement("input");
    password.placeholder = "Password";
    password.className = "BigInput"
    password.type = "password";
    password.addEventListener(
      "change",
      (e: any) => (credentials.password = e.target.value)
    );
    InputSection.appendChild(password);
    SignUpCard.appendChild(InputSection)


    // const SmallInputSection = this.ownerDocument.createElement("section")
    // SmallInputSection.className = 'SmallInputSection'

    // const día = this.ownerDocument.createElement("input");
    // día.placeholder = "Día";
    // día.className = "SmallInput"
    // día.type = "number";
    // día.addEventListener(
    //   "change",
    //   (e: any) => (credentials.día = e.target.value)
    // );
    // SmallInputSection.appendChild(día);

    // const mes = this.ownerDocument.createElement("input");
    // mes.placeholder = "Mes";
    // mes.className = "SmallInput"
    // mes.type = "number";
    // mes.addEventListener(
    //   "change",
    //   (e: any) => (credentials.mes = e.target.value)
    // );
    // SmallInputSection.appendChild(mes);

    // const año = this.ownerDocument.createElement("input");
    // año.placeholder = "Año";
    // año.className = "SmallInput"
    // año.type = "number";
    // año.addEventListener(
    //   "change",
    //   (e: any) => (credentials.año = e.target.value)
    // );
    // SmallInputSection.appendChild(año);
    // SignUpCard.appendChild(SmallInputSection)

    const checkBoxLogin = this.ownerDocument.createElement("checkbox-login") as CheckBoxLogin;

    SignUpCard.appendChild( checkBoxLogin)
    this.shadowRoot?.appendChild(SignUpCard);

    const buttonSign = this.ownerDocument.createElement("button-sign") as ButtonSign;
    buttonSign.addEventListener("click", this.handleSignUpButton);
    SignUpCard.appendChild(buttonSign)
    this.shadowRoot?.appendChild(SignUpCard);

    const descLogin = this.ownerDocument.createElement("description-login") as DescriptionCardLogin;
    SignUpCard.appendChild(descLogin)
    this.shadowRoot?.appendChild(SignUpCard);

    container.appendChild(SignUpCard);
    this.shadowRoot?.appendChild(container);

    
  
  }
}

customElements.define("signup-channel", SignUp);