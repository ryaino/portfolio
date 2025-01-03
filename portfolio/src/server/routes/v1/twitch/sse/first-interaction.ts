import { defineEventHandler, createEventStream } from "h3";
import { EVENT_STREAM_CLIENTS_FIRST_INTERACTIONS } from "../../../../twitch/twitch.globals";

export default defineEventHandler(async (event) => {
  const newStream = createEventStream(event);

  newStream.onClosed(async () => {
    await newStream.close();
  });
  EVENT_STREAM_CLIENTS_FIRST_INTERACTIONS.push(newStream);

  return newStream.send();
});
