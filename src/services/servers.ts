import { InterServers } from "../types/servers";
import { servers } from "../mocks/getServers";

class Servers {
  async get(): Promise<InterServers[]> {
    console.log("starting servers...");
    const value: InterServers[] = await new Promise((resolve) => {
      setTimeout(() => resolve(servers), 3000);
    });
    return value;
  }
}

export default new Servers();
