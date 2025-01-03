import { ChatMessageEvent, COMMAND_MAPPINGS } from "./events.model";
import { InteractedUsers } from "./twitch.globals";
import { FirstInteraction } from "./firstInteraction";

export async function HandleChannelChatMessage(event: ChatMessageEvent) {
  const chatterName = event.chatter_user_name.toLowerCase();
  if (chatterName === "certified_ai_") return;

  if (!InteractedUsers.includes(chatterName)) {
    await FirstInteraction(chatterName);
  }

  if (!event.message.text.startsWith("!")) return;

  const command = event.message.text.split(" ")[0].substring(1);
  const allCommands = Object.keys(COMMAND_MAPPINGS);

  if (!allCommands.includes(command)) return;

  await COMMAND_MAPPINGS[command](event);
}
