/** "Ask Austin" settings, edited in the CMS (Site → Ask Austin). */
import raw from "./generated/chatbot.json";

export const chatbot = {
  button: raw.button || "Ask about Austin",
  greeting: raw.greeting ?? "",
  prompts: (raw.prompts ?? []) as string[],
};
