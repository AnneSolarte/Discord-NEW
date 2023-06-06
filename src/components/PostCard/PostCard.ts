import PostCardStyle from "./PostCard.css";
import { appState, addObserver } from "../../store";
import { dispatch } from "../../store";
import { SavePost, getPosts } from "../../store/actions";
import { Post } from "../../types/post";

const postForm: Post = {
  id: "",
  img: "",
  title: "Bienvenido a Discord",
  message: "Inicia creando post",
  createdAt: "",
};

class PostCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this);
  }

  async connectedCallback() {
    if (!appState.Post) {
      console.log("Haciendo petición firebase");
      dispatch(await getPosts());
    }

    this.render();
  }

  render() {
    const container = this.ownerDocument.createElement("section");
    container.className = "PostCards";

    if (!appState.Post) {
      // Mostrar un mensaje de carga o estado de espera
      const loadingMessage = this.ownerDocument.createElement("p");
      loadingMessage.innerText = "Cargando posts...";
      container.appendChild(loadingMessage);
    } else {
      appState.Post.forEach((p) => {
        const postCard = this.ownerDocument.createElement("section");
        postCard.className = "Post";

        const Upsection = this.ownerDocument.createElement("section");
        Upsection.className = "Upsection";

        const tittle = this.ownerDocument.createElement("h2");
        tittle.className = "tittle";
        tittle.innerText = p.title;

        const CreatedAt = this.ownerDocument.createElement("p");
        CreatedAt.className = "time";
        CreatedAt.innerText = String(new Date(Number(p.createdAt) * 1000));

        const Message = this.ownerDocument.createElement("p");
        Message.className = "message";
        Message.innerText = p.message;

        const Image = this.ownerDocument.createElement("img");
        Image.className = "img";
        Image.src = p.img;

        Upsection.appendChild(tittle);
        Upsection.appendChild(CreatedAt);
        postCard.appendChild(Upsection);
        postCard.appendChild(Message);
        postCard.appendChild(Image);

        container.appendChild(postCard);
      });
    }

    this.shadowRoot?.appendChild(container);

    const css = this.ownerDocument.createElement("style");
    css.innerHTML = PostCardStyle;
    this.shadowRoot?.appendChild(css);
  }
}

customElements.define("post-card", PostCard);
export default PostCard;