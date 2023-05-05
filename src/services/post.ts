import { InterPost } from "../types/post";
import { post } from "../mocks/getPost";

class Post {
  async get(): Promise<InterPost[]> {
    console.log("starting posts...");
    const value: InterPost[] = await new Promise((resolve) => {
      setTimeout(() => resolve(post), 2000);
    });
    return value;
  }
}

export default new Post();