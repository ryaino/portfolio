import { defineEventHandler } from "h3";
import { GetSpotifyPlayerState } from "../../../spotify/external-requests/getSpotifyPlayerState";

export default defineEventHandler(async (event) => {
  return GetSpotifyPlayerState();
});
