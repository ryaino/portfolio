import { SpecialUser } from "./twitch.models";

export const BOT_NAME = "certified_ai_";
export const EVENT_STREAM_CLIENTS_CHAT_MESSAGES: any[] = [];
export const EVENT_STREAM_CLIENTS_FIRST_INTERACTIONS: any[] = [];

export const InteractedUsers: string[] = [];

export const SpecialUsers: SpecialUser[] = [
  {
    lowercaseName: "certified_nut",
    firstInteractionMessage: "It's the nut man himself!",
  },
  {
    lowercaseName: "andy68758",
    firstInteractionMessage:
      "It's Andy! The man who chats animatedly for hours about everything under the sun, immerses themselves in the" +
      " heartwarming" +
      " communal experience of hotpot feasts with friends, dives into the thrilling unpredictability of gacha games, and always has a sleek mechanical pencil ready to jot down creative thoughts or doodles at any moment, creating a whirlwind of vibrant energy and fun wherever they go!",
  },
];
