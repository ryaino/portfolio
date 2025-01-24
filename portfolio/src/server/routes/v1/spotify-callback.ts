import { defineEventHandler, getQuery, sendRedirect } from "h3";
import { useStorage } from "nitropack/runtime";
import { db } from "../../plugins/db-setup";
import { TwitchApplicationTable } from "../../../db/schema/twitch_application.table";
import {
  NewSpotifyTokens,
  SpotifyTokensTable,
} from "../../../db/schema/spotify_tokens.table";

export default defineEventHandler(async (event) => {
  const code = getQuery(event)["code"];

  const url = "https://accounts.spotify.com/api/token";
  const formData = new URLSearchParams({
    code: code?.toString() ?? "",
    redirect_uri: "http://localhost:4200/api/v1/spotify-callback",
    grant_type: "authorization_code",
  });

  const headers = {
    Authorization:
      "Basic " +
      Buffer.from(
        import.meta.env["VITE_SPOTIFY_CLIENT_ID"] +
          ":" +
          import.meta.env["VITE_SPOTIFY_CLIENT_SECRET"],
      ).toString("base64"),
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const response = await $fetch<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }>(url, {
    method: "POST",
    headers,
    body: formData,
  });

  const newTokens: NewSpotifyTokens = {
    accessToken: response.access_token,
    expiresAt: Date.now() + response.expires_in * 1000,
    refreshToken: response.refresh_token,
  };

  await db.insert(SpotifyTokensTable).values(newTokens);

  await useStorage().setItem("AndeezNutz", response.access_token);
  return sendRedirect(event, "/");
});
