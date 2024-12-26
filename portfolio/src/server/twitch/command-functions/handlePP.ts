import {ChatMessageEvent} from "../events.model";
import {SendChatMessage} from "../sendChatMessage";

export async function HandlePP(event: ChatMessageEvent){
  const length = Math.floor(Math.random() * 10) + 1;
  const girth = Math.floor(Math.random() * 10) + 1

  await SendChatMessage(
    `@${event.chatter_user_name} has a pp with length ${length} and girth ${girth}.`,
  )
}
