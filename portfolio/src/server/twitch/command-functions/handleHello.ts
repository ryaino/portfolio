import { ChatMessageEvent } from "../events.model";
import { SendChatMessage } from "../externalRequests/sendChatMessage";

export async function HandleHello(event: ChatMessageEvent) {
  await SendChatMessage("HeyGuys @" + event.chatter_user_name);
}
