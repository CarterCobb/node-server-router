import { Routes, HTTPAction } from "node-server-router";

export default [
  /**
   * Example route.
   */
  {
    url: "/test",
    action: HTTPAction.GET,
    handlers: [(_, res) => res.status(200).json({ message: "Hello World!" })],
  },

  // Add more routes here or add more files that follow this structure.
] as Routes;
