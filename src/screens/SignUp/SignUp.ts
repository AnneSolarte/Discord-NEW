import SignUpStyle from "./SignUp.css";
import { BigInputsLogin } from "../../mocks/getBigInputsLogin";
import { SmallInputsLogin} from "../../mocks/getSmallInputsLogin"
import SmallInputs, {SmallInputsAtt} from "../../components/SmallInputs/SmallInputs";
import BigInputs, {BigInputsAtt} from "../../components/BigInputs/BigInputs";
import LoginDiv from "../../components/LoginDiv/LoginDiv";
import DescriptionCardLogin  from "../../components/DescriptionCardLogin/DescriptionCardLogin";
import CheckBoxLogin from "../../components/CheckBoxLogin/CheckBoxLogin";
import ButtonSignUp from "../../components/ButtonSignUp/ButtonSignUp";
import { getPosts } from "../../store/actions";
import { getFriends } from "../../store/actions";
import { getServers} from "../../store/actions";
import { addObserver, appState, dispatch } from "../../store/index";

export default class SignUp extends HTMLElement {
    BigInputsList: BigInputs[] = [];
    SmallInputsList: SmallInputs[] = []

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this);
  }

  async connectedCallback() {
    if (appState.friends.length === 0) {
      const action = await getFriends();
      dispatch(action);
    } if (appState.servers.length === 0) {
      const actions = await getServers();
      dispatch(actions);
    } if (appState.post.length === 0) {
      const actions = await getPosts();
      dispatch(actions);
    } else {
      this.render();
    }
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

    BigInputsLogin.forEach((data) => {
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

    SmallInputsLogin.forEach((data) => {
        const SmallInputs = this.ownerDocument.createElement("small-input") as SmallInputs;
        SmallInputs.setAttribute(SmallInputsAtt.name, data.name);
        this.SmallInputsList.push(SmallInputs);
    });

    const SmallInputSection = this.ownerDocument.createElement("section")
    SmallInputSection.className = 'SmallInputSection'
    this.SmallInputsList.forEach((ServersCard) => {
        SmallInputSection.appendChild(ServersCard)
    });
    LoginCard.appendChild(SmallInputSection);

    

    const checkBoxLogin = this.ownerDocument.createElement("checkbox-login") as CheckBoxLogin;
    LoginCard.appendChild( checkBoxLogin)
    this.shadowRoot?.appendChild(LoginCard);

    const buttonLogin = this.ownerDocument.createElement("button-signup") as ButtonSignUp;
    LoginCard.appendChild(buttonLogin)
    this.shadowRoot?.appendChild(LoginCard);

    const descLogin = this.ownerDocument.createElement("description-login") as DescriptionCardLogin;
    LoginCard.appendChild(descLogin)
    this.shadowRoot?.appendChild(LoginCard);

    container.appendChild(LoginCard);
    this.shadowRoot?.appendChild(container);

    
  
  }
}

customElements.define("signup-channel", SignUp);