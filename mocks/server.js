import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const server = setupWorker(...handlers);

// Start the MSW server
export const startMsw = () => {
  server.start();
};
