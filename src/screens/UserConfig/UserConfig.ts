import HomeStyle from "./UserConfig.css";

import FriendsOnDiv from "../../components/FriendsOnDiv/FriendsOnDiv";
import { addObserver, appState, dispatch } from "../../store/index";
import { Edit, getU, setUserCredentials } from "../../store/actions";
import { navigate } from "../../store/actions";
import { Screens } from "../../types/navigation";
import firebase from "../../utils/firebase";
import { ConfigDiv, ProfileBar } from "../../components/export";
import EditProfile from "../../components/EditProfile/EditProfile";

const formUser = { 
    uid: "",
    userName: "",
    email: "",
    password: "",
    img: "",
  };

export default class UserConfig extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this);
  }

  async connectedCallback() {
    this.render();
    await firebase.AddUserDB(appState.userInfo)
    
  }

  logOutUser(){
    if(appState.user !== null || ''){
      localStorage.clear()
      dispatch(setUserCredentials(''));
      appState.Users = [];
      appState.user = "";
      appState.Post = [];
      appState.Friends = [];
      appState.Messages = [];
      appState.serverState = {id: "",
      name: "",
      img: "",
      createdAt: ""}
      appState.Servers = []
      appState.userInfo = {
        uid: "",
        userName: "",
        email: "",
        password: "",
        img: "/img/user.png",
      },
      sessionStorage.clear();
      dispatch(navigate(Screens.LOGIN));
      location.reload();
    }
  }

  async render() {
    if (this.shadowRoot) {
        this.shadowRoot.innerHTML = ``;
      
        const css = this.ownerDocument.createElement("style");
        css.innerHTML = HomeStyle;
        this.shadowRoot?.appendChild(css);   
    }

   
    const section2 = this.ownerDocument.createElement("section")
    section2.className = 'Section2'

    const config = this.ownerDocument.createElement("config-div") as ConfigDiv;
    section2.appendChild(config)

    this.shadowRoot?.appendChild(section2);

    const section3 = this.ownerDocument.createElement("section")
    section3.className = 'Section3'

    const barProfile = this.ownerDocument.createElement("profile-bar") as ProfileBar;
    section3.appendChild(barProfile)

    const editP = this.ownerDocument.createElement("edit-profile") as EditProfile;
    section3.appendChild(editP)
    
    const sectionEditProfile = this.ownerDocument.createElement("section");
            sectionEditProfile.className = "sectionEditProfile"

            const sectionEditProfileData = this.ownerDocument.createElement("section");
            sectionEditProfileData.className = "sectionEditProfileData"

            const ProfileImg =  this.ownerDocument.createElement("img");
            ProfileImg.className = "EditProfileImg"
            ProfileImg.src = appState.userInfo.img
            sectionEditProfile.appendChild(ProfileImg)

            const EditProfileImg =  this.ownerDocument.createElement("input");
            EditProfileImg.type = "file"
            EditProfileImg.addEventListener("change", async () =>{
                const file = EditProfileImg.files?.[0];
                if (file) await firebase.uploadFile(file);
                console.log(file?.name);
                if (file) {
                  const img = await firebase.getFile(file.name);
                  console.log("img", img);
                  const src = String(img)
                  formUser.img = src
              }
              });
            sectionEditProfile.appendChild(EditProfileImg)

            const EditProfileName = this.ownerDocument.createElement("input");
            EditProfileName.placeholder = appState.userInfo.userName
            EditProfileName.className = "EditProfileText"
            EditProfileName.addEventListener("change", (e:any)=>
            formUser.userName = e.target.value);

            sectionEditProfileData.appendChild(EditProfileName)

            const btnEdit = this.ownerDocument.createElement("button")
            btnEdit.innerText = "Edit"
            btnEdit.addEventListener("click", async()=>{
                dispatch(await Edit(formUser))
                dispatch(await getU(formUser))
            })
            sectionEditProfileData.appendChild(btnEdit)

            sectionEditProfile.appendChild(sectionEditProfileData)
            
            section3.appendChild(sectionEditProfile);

    const logOut = this.ownerDocument.createElement("button");
    logOut.innerText = "Log Out";
    logOut.className = "ButtonLogOut"
    logOut.addEventListener("click", this.logOutUser)
    section3.appendChild(logOut);

    this.shadowRoot?.appendChild(section3);

  }
}

customElements.define("user-config", UserConfig);
