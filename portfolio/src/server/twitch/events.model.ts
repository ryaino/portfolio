import {HandleHello} from "./command-functions/handleHello";
import {HandlePP} from "./command-functions/handlePP";

export enum TWITCH_EVENT_TYPE {
  ChannelChatMessage = "channel.chat.message"
}

export interface ChatMessageEvent {
  "broadcaster_user_id": string,
  "broadcaster_user_login": string,
  "broadcaster_user_name": string,
  "chatter_user_id": string,
  "chatter_user_login": string,
  "chatter_user_name": string,
  "message_id": string,
  "message": {
    "text": string,
    "fragments":        {
      "type": string,
      "text": string,
      "cheermote": string,
      "emote": string,
      "mention": string
    }[]
  },
  "color": string,
  "badges":      {
    "set_id": string,
    "id": string,
    "info": string
  }[],
  "message_type": string,
  "cheer": string,
  "reply": string,
  "channel_points_custom_reward_id": string,
  "source_broadcaster_user_id": string,
  "source_broadcaster_user_login": string,
  "source_broadcaster_user_name": string,
  "source_message_id": string,
  "source_badges":      {
    "set_id": string,
    "id": string,
    "info": string
  }[]
}

export const COMMAND_MAPPINGS: {
  [key: string]: ((event: ChatMessageEvent) => Promise<void>)
} = {
  "hello": HandleHello,
  "pp": HandlePP
}
