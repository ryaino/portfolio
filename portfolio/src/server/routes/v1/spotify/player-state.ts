import { defineEventHandler } from "h3";
import { useStorage } from "nitropack/runtime";

export default defineEventHandler(async (event) => {
  const headers = {
    Authorization: "Bearer " + (await useStorage().getItem("AndeezNutz")),
  };

  const response = await $fetch("https://api.spotify.com/v1/me/player", {
    method: "GET",
    headers,
  });

  return response;
});
