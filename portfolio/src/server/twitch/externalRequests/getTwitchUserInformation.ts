import { RefreshAccessToken } from "./refreshAccessToken";

export async function GetTwitchUserInformation(chatterName: string) {
  const newToken = await RefreshAccessToken();

  const headers = {
    Authorization: "Bearer " + newToken.access_token,
    "Client-Id": import.meta.env["VITE_TWITCH_APPLICATION_CLIENT_ID"],
  };

  return await $fetch<{
    data: [
      {
        profile_image_url: string;
      },
    ];
  }>(`https://api.twitch.tv/helix/users?login=${chatterName}`, {
    method: "GET",
    headers,
  });
}
