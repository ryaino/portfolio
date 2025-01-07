import GetTwitchAccessToken from "../utils/getTwitchAccessToken";

export async function SendChatMessage(message: string) {
  const newToken = await GetTwitchAccessToken();

  const headers = {
    Authorization: "Bearer " + newToken,
    "Client-Id": import.meta.env["VITE_TWITCH_APPLICATION_CLIENT_ID"],
    "Content-Type": "application/json",
  };
  await $fetch("https://api.twitch.tv/helix/chat/messages", {
    method: "POST",
    headers,
    body: {
      broadcaster_id: "30631605",
      sender_id: "1219437984",
      message: message,
    },
  });
}
