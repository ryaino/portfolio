export async function RefreshAccessToken() {
  const url = 'https://id.twitch.tv/oauth2/token';
  const formData = new URLSearchParams({
    'client_id': import.meta.env['VITE_TWITCH_APPLICATION_CLIENT_ID'],
    'client_secret': import.meta.env['VITE_TWITCH_APPLICATION_CLIENT_SECRET'],
    'grant_type': 'client_credentials',
  });

  const accessTokenHeaders = {
    'Content-Type' : 'application/x-www-form-urlencoded',
  };

  return await $fetch<{
    'access_token': string;
    'token_type': string;
    'expires_in': number;
  }>(url, {
    method: "POST",
    headers: accessTokenHeaders,
    body: formData
  });
}
