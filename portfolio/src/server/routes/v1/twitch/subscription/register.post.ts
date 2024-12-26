import {defineEventHandler, readBody} from "h3";
import {CreateEventSubscriptionDto} from "../../../../../shared/dtos/twitch/eventSubscriptionDtos";
import {RefreshAccessToken} from "../../../../twitch/refreshAccessToken";

export default defineEventHandler(async (event) => {
  let body: CreateEventSubscriptionDto = await readBody(event);

  const freshAccessToken = await RefreshAccessToken();

  const registerSubscriptionHeaders = {
    'Authorization': 'Bearer ' + freshAccessToken.access_token,
    'Client-Id': import.meta.env['VITE_TWITCH_APPLICATION_CLIENT_ID'],
    'content-type': 'application/json',
  }

  return await $fetch("https://api.twitch.tv/helix/eventsub/subscriptions", {
    method: "POST",
    headers: registerSubscriptionHeaders,
    body: {
      type: body.subscriptionType,
      version: body.version,
      condition: {
        "broadcaster_user_id": "30631605",
        "user_id": "1219437984"
      },
      transport: {
        method: "webhook",
        callback: body.webhookUrl,
        secret: import.meta.env['VITE_TWITCH_SECRET']
      }
    }
  });

})
