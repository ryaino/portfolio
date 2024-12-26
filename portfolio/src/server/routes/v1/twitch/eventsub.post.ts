import {defineEventHandler, H3Event, EventHandlerRequest, readBody, setResponseStatus, setResponseHeaders} from "h3";
import * as crypto from 'crypto';
import {EVENT_STREAM_CLIENTS} from "./sse";

const TWITCH_MESSAGE_ID = 'Twitch-Eventsub-Message-Id'.toLowerCase();
const TWITCH_MESSAGE_TIMESTAMP = 'Twitch-Eventsub-Message-Timestamp'.toLowerCase();
const TWITCH_MESSAGE_SIGNATURE = 'Twitch-Eventsub-Message-Signature'.toLowerCase();
const MESSAGE_TYPE = 'Twitch-Eventsub-Message-Type'.toLowerCase();

// Notification message types
const MESSAGE_TYPE_VERIFICATION = 'webhook_callback_verification';
const MESSAGE_TYPE_NOTIFICATION = 'notification';
const MESSAGE_TYPE_REVOCATION = 'revocation';

const HMAC_PREFIX = 'sha256=';

export default defineEventHandler(async (event) => {
  let secret = getSecret();
  let message = await getHmacMessage(event);
  let hmac = HMAC_PREFIX + getHmac(secret, message);

  if (!verifyMessage(hmac, event.headers.get(TWITCH_MESSAGE_SIGNATURE) ?? '')) {
    console.log('403');    // Signatures didn't match.
    setResponseStatus(event, 403, "Signatures didn't match");
    return;
  }
  console.log("signatures match");

  // Get JSON object from body, so you can process the message.
  let notification = await readBody(event);
  const messageType = event.headers.get(MESSAGE_TYPE);

  if (MESSAGE_TYPE_NOTIFICATION === messageType) {
    // TODO: Do something with the event's data.

    console.log(`Event type: ${notification.subscription.type}`);
    console.log(JSON.stringify(notification.event, null, 4));

    for (const client of EVENT_STREAM_CLIENTS) {
      await client.push('This is an event from getting a twitch message');
    }

    if(notification.event.message?.text === 'PP') {
      const headers = {
        'Authorization': 'Bearer ' + import.meta.env['VITE_TWITCH_APPLICATION_ACCESS_TOKEN'],
        'Client-Id': import.meta.env['VITE_TWITCH_APPLICATION_CLIENT_ID'],
        'Content-Type': 'application/json',
      };
      const response = await $fetch('https://api.twitch.tv/helix/chat/messages', {
        method: "POST",
        headers,
        body: {
          broadcaster_id: '30631605',
          sender_id: '1219437984',
          message: "Hello, World! HeyGuys"
        }
      });
    }

    setResponseStatus(event, 204, "success");

    return 'success';
  }
  else if (MESSAGE_TYPE_VERIFICATION === messageType) {
    setResponseHeaders(event, {
      "Content-Type": "text/plain",
      "cache-control": "no-cache",
    });
    setResponseStatus(event, 200);
    return notification.challenge;
  }
  else if (MESSAGE_TYPE_REVOCATION === messageType) {
    setResponseStatus(event, 204);

    console.log(`${notification.subscription.type} notifications revoked!`);
    console.log(`reason: ${notification.subscription.status}`);
    console.log(`condition: ${JSON.stringify(notification.subscription.condition, null, 4)}`);
    return;
  }
  else {
    setResponseStatus(event, 204);
    console.log(`Unknown message type: ${messageType}`);
  }
})

function getSecret() {
  return import.meta.env['VITE_TWITCH_SECRET'];
}

// Build the message used to get the HMAC.
async function getHmacMessage(request: H3Event<EventHandlerRequest>) {
  const uwu = await readBody(request);
  const message = (request.headers?.get(TWITCH_MESSAGE_ID) ?? '') + (request.headers?.get(TWITCH_MESSAGE_TIMESTAMP) ?? '') + JSON.stringify(uwu);
  return message;
}

// Get the HMAC.
function getHmac(secret: string, message: string) {
  return crypto.createHmac('sha256', secret)
    .update(message)
    .digest('hex');
}

// Verify whether our hash matches the hash that Twitch passed in the header.
function verifyMessage(hmac: string, verifySignature: string) {
  return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(verifySignature));
}
