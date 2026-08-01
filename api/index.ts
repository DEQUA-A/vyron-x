import { nodeAppHandler } from "@vercel/node";
import app from "../server/index";

export default nodeAppHandler(app);