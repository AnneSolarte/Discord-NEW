import { InterFriends } from "../types/friends";
import { friends } from "../mocks/getFriends";

class Friends {
  async get(): Promise<InterFriends[]> {
    console.log("starting friends...");
    const value: InterFriends[] = await new Promise((resolve) => {
      setTimeout(() => resolve(friends), 3000);
    });
    return value;
  }
}

export default new Friends();
