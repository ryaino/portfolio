import { defineEventHandler, createEventStream } from "h3";
import { EVENT_STREAM_CLIENTS_CHAT_MESSAGES } from "../../../../twitch/twitch.globals";

export default defineEventHandler(async (event) => {
  const newStream = createEventStream(event);

  newStream.onClosed(async () => {
    await newStream.close();
  });
  EVENT_STREAM_CLIENTS_CHAT_MESSAGES.push(newStream);

  return newStream.send();
});
