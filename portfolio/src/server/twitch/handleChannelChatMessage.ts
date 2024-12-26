import {ChatMessageEvent, COMMAND_MAPPINGS} from "./events.model";


export async function HandleChannelChatMessage(event: ChatMessageEvent) {

  if(event.chatter_user_name.toLowerCase() === 'certified_ai_') return;
  if(!event.message.text.startsWith("!")) return;

  const command = event.message.text.split(' ')[0].substring(1);
  const allCommands = Object.keys(COMMAND_MAPPINGS);

  if (!allCommands.includes(command)) return;

  await COMMAND_MAPPINGS[command](event);

}
