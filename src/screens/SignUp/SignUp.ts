import SignUpStyle from "./SignUp.css"
import LoginDiv from "../../components/LoginDiv/LoginDiv";
import DescriptionCardLogin  from "../../components/DescriptionCardSignUp/DescriptionCardSignUp";
import CheckBoxLogin from "../../components/CheckBoxLogin/CheckBoxLogin";
import ButtonSign from "../../components/ButtonSign/ButtonSign";
import { addObserver, appState, dispatch } from "../../store/index";
import { navigate, addUser } from "../../store/actions";
import { Screens } from "../../types/navigation";
import Firebase from "../../utils/firebase";

const credentials = { 
  uid: "",
  userName: "",
  email: "",
  password: "",
  img: "",
};

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
    const user = await Firebase.registerUser(credentials);
    dispatch(addUser(credentials))
    console.log(user);
    if(user) {
      dispatch(navigate(Screens.LOGIN)) 
      sessionStorage.clear();
    };
  }

  changeWindow(){
    dispatch(navigate(Screens.LOGIN))
  }

  backWindow(){
    dispatch(navigate(Screens.DASHBOARD))
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

    const icon = this.ownerDocument.createElement("img")
    icon.src = "/img/arrow_left.png"
    icon.className = "iconArrow"
    icon.addEventListener("click", this.backWindow);
    SignUpCard.appendChild(icon)

    const loginDiv = this.ownerDocument.createElement("login-div") as LoginDiv;
    SignUpCard.appendChild(loginDiv)
    this.shadowRoot?.appendChild(SignUpCard);

    const InputSection = this.ownerDocument.createElement("section")
    InputSection.className = 'BigInputSection'

    const userName = this.ownerDocument.createElement("input");
    userName.placeholder = "User Name";
    userName.className = "BigInput"
    userName.type = "text";
    userName.addEventListener(
      "change",
      (e: any) => (credentials.userName = e.target.value)
    );
    InputSection.appendChild(userName);

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

    const checkBoxLogin = this.ownerDocument.createElement("checkbox-login") as CheckBoxLogin;

    SignUpCard.appendChild( checkBoxLogin)
    this.shadowRoot?.appendChild(SignUpCard);

    const buttonSign = this.ownerDocument.createElement("button-sign") as ButtonSign;
    buttonSign.addEventListener("click", this.handleSignUpButton);
    SignUpCard.appendChild(buttonSign)
    this.shadowRoot?.appendChild(SignUpCard);

    const DescriptionDiv = this.ownerDocument.createElement("section")
    DescriptionDiv.className = "DescriptionDiv"

    const descLogin = this.ownerDocument.createElement("description-login") as DescriptionCardLogin;
    DescriptionDiv.appendChild(descLogin)

    const buttonLog = this.ownerDocument.createElement("button");
    buttonLog.innerText = "Login"
    buttonLog.className = "Link"
    buttonLog.addEventListener("click", this.changeWindow);
    DescriptionDiv.appendChild(buttonLog)

    SignUpCard.appendChild(DescriptionDiv)
    this.shadowRoot?.appendChild(SignUpCard);

    container.appendChild(SignUpCard);
    this.shadowRoot?.appendChild(container);

    
  
  }
}

customElements.define("signup-channel", SignUp);