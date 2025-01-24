import { useStorage } from "nitropack/runtime";
import GetSpotifyAccessToken from "../utils/getSpotifyAccessToken";

export async function GetSpotifyPlayerState() {
  const headers = {
    Authorization: "Bearer " + (await GetSpotifyAccessToken()),
  };

  const response = await $fetch("https://api.spotify.com/v1/me/player", {
    method: "GET",
    headers,
  });

  return response;
}
