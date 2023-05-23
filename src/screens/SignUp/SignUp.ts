import SignUpStyle from "./SignUp.css";
import { BigInputsLogin } from "../../mocks/getBigInputsLogin";
import { SmallInputsLogin} from "../../mocks/getSmallInputsLogin"
import SmallInputs, {SmallInputsAtt} from "../../components/SmallInputs/SmallInputs";
import BigInputs, {BigInputsAtt} from "../../components/BigInputs/BigInputs";
import LoginDiv from "../../components/LoginDiv/LoginDiv";
import DescriptionCardLogin  from "../../components/DescriptionCardSignUp/DescriptionCardSignUp";
import CheckBoxLogin from "../../components/CheckBoxLogin/CheckBoxLogin";
import ButtonSign from "../../components/ButtonSign/ButtonSign";
import { addObserver, appState, dispatch } from "../../store/index";
import { navigate } from "../../store/actions";
import { Screens } from "../../types/navigation";
import Firebase from "../../utils/firebase";

const credentials = { email: "", password: "", día: "", mes: "", año: "" };

export default class SignUp extends HTMLElement {
    BigInputsList: BigInputs[] = [];
    SmallInputsList: SmallInputs[] = []

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this);
  }

  connectedCallback() {
    this.render();
  }

  async handleLoginButton() {
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

    const LoginCard = this.ownerDocument.createElement("section")
    LoginCard.className = 'LoginCard'

    const loginDiv = this.ownerDocument.createElement("login-div") as LoginDiv;
    LoginCard.appendChild(loginDiv)
    this.shadowRoot?.appendChild(LoginCard);

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
    LoginCard.appendChild(InputSection)


    const SmallInputSection = this.ownerDocument.createElement("section")
    SmallInputSection.className = 'SmallInputSection'

    const día = this.ownerDocument.createElement("input");
    día.placeholder = "día";
    día.className = "SmallInput"
    día.type = "día";
    día.addEventListener(
      "change",
      (e: any) => (credentials.día = e.target.value)
    );
    SmallInputSection.appendChild(día);

    const mes = this.ownerDocument.createElement("input");
    mes.placeholder = "mes";
    mes.className = "SmallInput"
    mes.type = "mes";
    mes.addEventListener(
      "change",
      (e: any) => (credentials.mes = e.target.value)
    );
    SmallInputSection.appendChild(mes);

    const año = this.ownerDocument.createElement("input");
    año.placeholder = "año";
    año.className = "SmallInput"
    año.type = "año";
    año.addEventListener(
      "change",
      (e: any) => (credentials.año = e.target.value)
    );
    SmallInputSection.appendChild(año);

    LoginCard.appendChild(SmallInputSection)



    LoginCard.appendChild(SmallInputSection);

    

    const checkBoxLogin = this.ownerDocument.createElement("checkbox-login") as CheckBoxLogin;
    LoginCard.appendChild( checkBoxLogin)
    this.shadowRoot?.appendChild(LoginCard);

    const buttonSign = this.ownerDocument.createElement("button-sign") as ButtonSign;
    buttonSign.addEventListener("click", this.handleLoginButton);
    LoginCard.appendChild(buttonSign)
    this.shadowRoot?.appendChild(LoginCard);

    const descLogin = this.ownerDocument.createElement("description-login") as DescriptionCardLogin;
    LoginCard.appendChild(descLogin)
    this.shadowRoot?.appendChild(LoginCard);

    container.appendChild(LoginCard);
    this.shadowRoot?.appendChild(container);

    
  
  }
}

customElements.define("signup-channel", SignUp);