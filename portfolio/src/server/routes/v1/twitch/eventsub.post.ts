import {
  defineEventHandler,
  H3Event,
  EventHandlerRequest,
  readBody,
  setResponseStatus,
  setResponseHeaders,
} from "h3";
import * as crypto from "crypto";
import { TWITCH_EVENT_TYPE } from "../../../twitch/events.model";
import { HandleChannelChatMessage } from "../../../twitch/handleChannelChatMessage";
import { ChatMessage } from "../../../../shared/twitch/chat-message.model";
import {
  BOT_NAME,
  EVENT_STREAM_CLIENTS_CHAT_MESSAGES,
} from "../../../twitch/twitch.globals";

const TWITCH_MESSAGE_ID = "Twitch-Eventsub-Message-Id".toLowerCase();
const TWITCH_MESSAGE_TIMESTAMP =
  "Twitch-Eventsub-Message-Timestamp".toLowerCase();
const TWITCH_MESSAGE_SIGNATURE =
  "Twitch-Eventsub-Message-Signature".toLowerCase();
const MESSAGE_TYPE = "Twitch-Eventsub-Message-Type".toLowerCase();

// Notification message types
const MESSAGE_TYPE_VERIFICATION = "webhook_callback_verification";
const MESSAGE_TYPE_NOTIFICATION = "notification";
const MESSAGE_TYPE_REVOCATION = "revocation";

const HMAC_PREFIX = "sha256=";

export default defineEventHandler(async (event) => {
  let secret = getSecret();
  let message = await getHmacMessage(event);
  let hmac = HMAC_PREFIX + getHmac(secret, message);

  if (!verifyMessage(hmac, event.headers.get(TWITCH_MESSAGE_SIGNATURE) ?? "")) {
    console.log("403"); // Signatures didn't match.
    setResponseStatus(event, 403, "Signatures didn't match");
    return;
  }
  // Get JSON object from body, so you can process the message.
  let notification = await readBody(event);
  const messageType = event.headers.get(MESSAGE_TYPE);

  if (messageType === MESSAGE_TYPE_NOTIFICATION) {
    if (
      notification.subscription.type === TWITCH_EVENT_TYPE.ChannelChatMessage
    ) {
      await HandleChannelChatMessage(notification.event);
      if (notification.event.chatter_user_name.toLowerCase() !== BOT_NAME) {
        for (const client of EVENT_STREAM_CLIENTS_CHAT_MESSAGES) {
          const chatMessage: ChatMessage = {
            chatterName: notification.event.chatter_user_name,
            message: notification.event.message,
            color: notification.event.color,
          };
          await client.push({
            data: JSON.stringify(chatMessage),
          });
        }
      }
    }

    setResponseStatus(event, 204, "success");

    return "success";
  } else if (messageType === MESSAGE_TYPE_VERIFICATION) {
    setResponseHeaders(event, {
      "Content-Type": "text/plain",
      "cache-control": "no-cache",
    });
    setResponseStatus(event, 200);
    return notification.challenge;
  } else if (messageType === MESSAGE_TYPE_REVOCATION) {
    setResponseStatus(event, 204);

    console.log(`${notification.subscription.type} notifications revoked!`);
    console.log(`reason: ${notification.subscription.status}`);
    console.log(
      `condition: ${JSON.stringify(notification.subscription.condition, null, 4)}`,
    );
    return;
  } else {
    setResponseStatus(event, 204);
    console.log(`Unknown message type: ${messageType}`);
  }
});

function getSecret() {
  return import.meta.env["VITE_TWITCH_SECRET"];
}

// Build the message used to get the HMAC.
async function getHmacMessage(request: H3Event<EventHandlerRequest>) {
  const uwu = await readBody(request);
  const message =
    (request.headers?.get(TWITCH_MESSAGE_ID) ?? "") +
    (request.headers?.get(TWITCH_MESSAGE_TIMESTAMP) ?? "") +
    JSON.stringify(uwu);
  return message;
}

// Get the HMAC.
function getHmac(secret: string, message: string) {
  return crypto.createHmac("sha256", secret).update(message).digest("hex");
}

// Verify whether our hash matches the hash that Twitch passed in the header.
function verifyMessage(hmac: string, verifySignature: string) {
  return crypto.timingSafeEqual(
    Buffer.from(hmac),
    Buffer.from(verifySignature),
  );
}
