import { appState, dispatch } from "../../store";
import { navigate } from "../../store/actions";
import { Screens } from "../../types/navigation";
import EditProfileStyle from "./EditProfile.css"

class EditProfile extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
            const css = this.ownerDocument.createElement("style");
            css.innerHTML = EditProfileStyle;
            this.shadowRoot?.appendChild(css);

            const sectionEditProfile = this.ownerDocument.createElement("section");
            sectionEditProfile.className = "sectionEditProfile"

            const EditProfileImg =  this.ownerDocument.createElement("img");
            EditProfileImg.className = "EditProfileImg"
            EditProfileImg.src = appState.userInfo.img
            sectionEditProfile.appendChild(EditProfileImg)

            const sectionEditProfileData = this.ownerDocument.createElement("section");
            sectionEditProfileData.className = "sectionEditProfileData"

            const EditProfileName = this.ownerDocument.createElement("p");
            EditProfileName.textContent = appState.userInfo.userName
            EditProfileName.className = "EditProfileText"
            sectionEditProfileData.appendChild(EditProfileName)
            sectionEditProfile.appendChild(sectionEditProfileData)

            const uid = String(appState.userInfo.uid).slice(0, -23)

            const EditProfileId = this.ownerDocument.createElement("p");
            EditProfileId.textContent = "#" + uid
            EditProfileId.className = "userId"
            sectionEditProfileData.appendChild(EditProfileId)


            this.shadowRoot?.appendChild(sectionEditProfile);
        }
}

customElements.define("edit-profile", EditProfile);
export default EditProfile;