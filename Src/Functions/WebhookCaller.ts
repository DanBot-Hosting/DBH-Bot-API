import { WebhookURL } from "../Config.json";
import Undici from "undici";

export default async function WebhookCaller(Content: string): Promise<void> {
  await Undici.fetch(WebhookURL, {
    method: "POST",
    body: JSON.stringify({
      content: Content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
