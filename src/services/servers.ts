import { Server} from "../types/servers";
import { servers } from "../mocks/getServers";

class Servers {
  async get(): Promise<Server[]> {
    console.log("starting servers...");
    const value: Server[] = await new Promise((resolve) => {
      setTimeout(() => resolve(servers), 2000);
    });
    return value;
  }
}

export default new Servers();
