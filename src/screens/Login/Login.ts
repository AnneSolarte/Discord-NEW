import LoginStyle from "./Login.css";
import { BigInputsSignUp } from "../../mocks/getBigInputsSignUp";
import SmallInputs, {SmallInputsAtt} from "../../components/SmallInputs/SmallInputs";
import BigInputs, {BigInputsAtt} from "../../components/BigInputs/BigInputs";
import LoginDiv from "../../components/LoginDiv/LoginDiv";
import CheckBoxLogin from "../../components/CheckBoxLogin/CheckBoxLogin";
import ButtonLog from "../../components/ButtonLog/ButtonLog";
import { navigate } from "../../store/actions";
import Firebase from "../../utils/firebase";
import { Screens } from "../../types/navigation";
import { addObserver, appState, dispatch } from "../../store/index";
import DescriptionCardSignUp from "../../components/DescriptionCardSignUp/DescriptionCardSignUp";


const credentials = { email: "", password: "" };

export default class Login extends HTMLElement {
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
    Firebase.loginUser(credentials);
    dispatch(navigate(Screens.DASHBOARD));

  }

  render() {
    
    if (this.shadowRoot) {
        this.shadowRoot.innerHTML = ``;
      
        const css = this.ownerDocument.createElement("style");
        css.innerHTML = LoginStyle;
        this.shadowRoot?.appendChild(css);

    }

    const container = this.ownerDocument.createElement("section")
    container.className = 'container'

    const LoginCard = this.ownerDocument.createElement("section")
    LoginCard.className = 'LoginCard'

    const loginDiv = this.ownerDocument.createElement("login-div") as LoginDiv;
    LoginCard.appendChild(loginDiv)
    this.shadowRoot?.appendChild(LoginCard);

    BigInputsSignUp.forEach((data) => {
        const BigInputs = this.ownerDocument.createElement("big-input") as BigInputs;
        BigInputs.setAttribute(BigInputsAtt.name, data.name);
        this.BigInputsList.push(BigInputs);
    });

    const BigInputSection = this.ownerDocument.createElement("section")
    BigInputSection.className = 'BigInputSection'
    this.BigInputsList.forEach((ServersCard) => {
        BigInputSection.appendChild(ServersCard)
    });
    LoginCard.appendChild(BigInputSection);

    const buttonLog = this.ownerDocument.createElement("button-log") as ButtonLog;
    LoginCard.appendChild(buttonLog)
    this.shadowRoot?.appendChild(LoginCard);

    const descLogin = this.ownerDocument.createElement("description-signup") as DescriptionCardSignUp;
    LoginCard.appendChild(descLogin)
    this.shadowRoot?.appendChild(LoginCard);

    container.appendChild(LoginCard);
    this.shadowRoot?.appendChild(container);

  }
}

customElements.define("login-channel", Login);