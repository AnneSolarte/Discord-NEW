
import CreatePostBarClickStyle from "./CreatePostBarClick.css"
import { Post } from "../../types/post";
import { appState, dispatch } from "../../store";
import { SavePost, navigate } from "../../store/actions";
import { Screens } from "../../types/navigation";
import firebase from "../../utils/firebase";


const postForm: Post = {
    id: "",
    img: "",
    title: "",
    message: "",
    createdAt: ""
}
class CreatePostBarClick extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }
    
    render() {

            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = ``;

                const css = this.ownerDocument.createElement("style");
                css.innerHTML = CreatePostBarClickStyle;
                this.shadowRoot?.appendChild(css);
            }

        const formSection = this.ownerDocument.createElement("section")
        formSection.className = "FormSection"
        

        const iconX = this.ownerDocument.createElement("img")
        iconX.src = "/img/x_icon.png"
        iconX.className = "IconX"
        iconX.addEventListener("click", async () => {
            dispatch(navigate(Screens.POST))
          })

        const sectionInputs = this.ownerDocument.createElement("section")
        sectionInputs.className = "sectionInputs"
        
        const tittle = this.ownerDocument.createElement("input")
        tittle.placeholder = "Title"
        tittle.className = "InputPost"
        tittle.type = "text"
        tittle.addEventListener("change", (e:any)=>{
            postForm.title = e?.target?.value
        })

        const Message = this.ownerDocument.createElement("input")
        Message.placeholder = "Message"
        Message.className = "InputPost"
        Message.type = "text"
        Message.addEventListener("change", (e:any)=>{
            postForm.message = e?.target?.value
        })

        const Image = this.ownerDocument.createElement("input")
        Image.src = "/img/input_file.png"
        Image.placeholder = "Message"
        Image.className = "InputPost"
        Image.type = "file"
        Image.addEventListener("change", async () =>{
            const file = Image.files?.[0];
            if (file) await firebase.uploadFile(file);
            console.log(file?.name);
            if (file) {
              const img = await firebase.getFile(file.name);
              console.log("img", img);
              const src = String(img)
              postForm.img = src
          }
          });



        const Postbtn = this.ownerDocument.createElement("button")
        Postbtn.innerText = "New Post"
        Postbtn.className = "ButtonPost"
        Postbtn.addEventListener("click", async ()=>{
            console.log(postForm)
            dispatch(await SavePost(postForm, appState.serverState.id))
        })

        formSection.appendChild(iconX)
        sectionInputs.appendChild(tittle)
        sectionInputs.appendChild(Message)
        formSection.appendChild(sectionInputs)
        formSection.appendChild(Image)
        formSection.appendChild(Postbtn)
        

        this.shadowRoot?.appendChild(formSection)
        }
}

customElements.define("create-postclick", CreatePostBarClick);
export default CreatePostBarClick;