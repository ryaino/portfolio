import {
  NewTwitchApplication,
  TwitchApplicationTable,
} from "../../../db/schema/twitch_application.table";
import { db } from "../../plugins/db-setup";

export async function RefreshAccessToken() {
  const url = "https://id.twitch.tv/oauth2/token";
  const formData = new URLSearchParams({
    client_id: import.meta.env["VITE_TWITCH_APPLICATION_CLIENT_ID"],
    client_secret: import.meta.env["VITE_TWITCH_APPLICATION_CLIENT_SECRET"],
    grant_type: "client_credentials",
  });

  const accessTokenHeaders = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const newToken = await $fetch<{
    access_token: string;
    token_type: string;
    expires_in: number;
  }>(url, {
    method: "POST",
    headers: accessTokenHeaders,
    body: formData,
  });
  const newTwitchApplication: NewTwitchApplication = {
    access_token: newToken.access_token,
    expiresAt: Date.now() + newToken.expires_in,
  };

  await db.insert(TwitchApplicationTable).values(newTwitchApplication);
  return newToken;
}
