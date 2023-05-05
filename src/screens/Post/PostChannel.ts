import PostChannelStyle from "./PostChannel.css";
import { navigate } from "../../store/actions";
import { Screens } from "../../types/store";
import Servers, { ServerAtt } from "../../components/Servers/Servers";
import FriendsOnline, { FriendsOnAtt } from "../../components/FriendsOnline/FriendsOnline";
import User, { UserAtt } from "../../components/User/user";
import WriteBar from "../../components/WriteBar/WriteBar";
import PostBar from "../../components/PostBar/PostBar";
import PostCard, { PostCardAtt} from "../../components/PostCard/PostCard";
import CreatePostBar from "../../components/CreatePostBar/CreatePostBar";
import ServerDiv from "../../components/ServerDiv/ServersDiv";
import { getPosts } from "../../store/actions";
import { getFriends } from "../../store/actions";
import { getServers} from "../../store/actions";
import { addObserver, appState, dispatch } from "../../store/index";


export default class PostChannel extends HTMLElement {
  ServersList: Servers[] = [];
  PostList: PostCard[] = [];
  FriendsOnList: FriendsOnline[] = [];

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
        css.innerHTML = PostChannelStyle;
        this.shadowRoot?.appendChild(css);

    }

    appState.servers.forEach((data) => {
        const ServersCard = this.ownerDocument.createElement("my-servers") as Servers;
        ServersCard.setAttribute(ServerAtt.img, data.img);
        this.ServersList.push(ServersCard);
    });

    const section1 = this.ownerDocument.createElement("section")
    section1.className = 'Section1'

    const ServersCards = this.ownerDocument.createElement("div")
    ServersCards.className = 'ServerSection'
    this.ServersList.forEach((ServersCard) => {
        ServersCards.appendChild(ServersCard)
    });
    section1.appendChild(ServersCards)
    this.shadowRoot?.appendChild(section1);

    const section2 = this.ownerDocument.createElement("section")
    section2.className = 'Section2'
    section2.addEventListener("click", () => {
      dispatch(navigate(Screens.SERVERS));
    });
    const serverDiv = this.ownerDocument.createElement("server-div") as ServerDiv;
    section2.appendChild(serverDiv)
    this.shadowRoot?.appendChild(section2);

    const section3 = this.ownerDocument.createElement("section")
    section3.className = 'PostSection'

    const postBar = this.ownerDocument.createElement("post-bar") as PostBar;
    
    section3.appendChild(postBar)

    const createPostBar = this.ownerDocument.createElement("create-post") as CreatePostBar;
    section3.appendChild(createPostBar)

    appState.post.forEach((data) => {
      const postCard = this.ownerDocument.createElement("post-card") as PostCard;
      postCard.setAttribute(PostCardAtt.img, data.img);
      postCard.setAttribute(PostCardAtt.info, data.info);
      postCard.setAttribute(PostCardAtt.name, data.name);
      postCard.setAttribute(PostCardAtt.time, data.time);
      this.PostList.push(postCard);
    });

    const PostCards = this.ownerDocument.createElement("div")
    PostCards.className = 'Posts'
    this.PostList.forEach((postCard) => {
        PostCards.appendChild(postCard)
    });
    section3.appendChild(PostCards);
    

    const writeBar = this.ownerDocument.createElement("write-bar") as WriteBar;
    section3.appendChild(writeBar)
    this.shadowRoot?.appendChild(section3);

    
    const section4 = this.ownerDocument.createElement("section")
    section4.className = 'Section4'
    const user = this.ownerDocument.createElement("my-user") as User;
    section4.appendChild(user)
    this.shadowRoot?.appendChild(section4);


    
  
  }
}

customElements.define("post-channel", PostChannel);
