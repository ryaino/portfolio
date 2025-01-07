import GetTwitchAccessToken from "../utils/getTwitchAccessToken";

export async function GetTwitchUserInformation(chatterName: string) {
  const newToken = await GetTwitchAccessToken();

  const headers = {
    Authorization: "Bearer " + newToken,
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
