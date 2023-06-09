import LoginStyle from "./Login.css";
import LoginDiv from "../../components/LoginDiv/LoginDiv";
import ButtonLog from "../../components/ButtonLog/ButtonLog";
import { SaveServer, navigate } from "../../store/actions";
import { Screens } from "../../types/navigation";
import { addObserver, appState, dispatch } from "../../store/index";
import DescriptionCardSignUp from "../../components/DescriptionCardSignUp/DescriptionCardSignUp";
import firebase from "../../utils/firebase";
import { Server } from "../../types/servers";

const credentials = { 
  uid: appState.userInfo.uid,
  userName: appState.userInfo.userName,
  email: "",
  password: "",
  img: appState.userInfo.img,
};

const formData: Server = {
  id: "",
  name: "Bienvenido a Discord",
  img: "/img/Server4.png",
  createdAt: "",
};


export default class Login extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this);
    
  }

  connectedCallback() {
    this.render();
    console.log('AppState',appState.user);
  }

  async handleLoginButton() {
    await firebase.loginUser(credentials);
    dispatch(await SaveServer(formData))
    console.log(appState.user)
  }

  changeWindow(){
    dispatch(navigate(Screens.SIGNUP))
  }

  backWindow(){
    dispatch(navigate(Screens.DASHBOARD))
    
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

    const icon = this.ownerDocument.createElement("img")
    icon.src = "/img/arrow_left.png"
    icon.className = "iconArrow"
    icon.addEventListener("click", this.backWindow);
    LoginCard.appendChild(icon)

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

    const buttonLog = this.ownerDocument.createElement("button-log") as ButtonLog;
    buttonLog.addEventListener("click", this.handleLoginButton);
    LoginCard.appendChild(buttonLog)

    const DescriptionDiv = this.ownerDocument.createElement("section")
    DescriptionDiv.className = "DescriptionDiv"

    const descLogin = this.ownerDocument.createElement("description-signup") as DescriptionCardSignUp;
    DescriptionDiv.appendChild(descLogin)

    const buttonSignUp = this.ownerDocument.createElement("button");
    buttonSignUp.innerText = "SignUp"
    buttonSignUp.className = "Link"
    buttonSignUp.addEventListener("click", this.changeWindow);
    DescriptionDiv.appendChild(buttonSignUp)

    LoginCard.appendChild(DescriptionDiv)
    this.shadowRoot?.appendChild(LoginCard);


    container.appendChild(LoginCard);
    this.shadowRoot?.appendChild(container);

  }
}

customElements.define("login-channel", Login);