import {
  CopilotRuntime,
  OpenAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";

import { NextRequest } from "next/server";
import OpenAI from "openai";

console.log("--------------- , ", process.env.OPENAI_API_KEY);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
console.log("open ai ", openai);

const serviceAdapter = new OpenAIAdapter({
  openai,
  model: "gpt-3.5-turbo",
});
const runtime = new CopilotRuntime();

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req);
};
