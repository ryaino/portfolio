import {SendChatMessage} from "../sendChatMessage";
import {ChatMessageEvent} from "../events.model";

export async function HandleHello(event: ChatMessageEvent){
  await SendChatMessage(
    "HeyGuys @" + event.chatter_user_name
  )
}
