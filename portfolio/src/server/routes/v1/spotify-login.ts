import { defineEventHandler, sendRedirect } from "h3";

export default defineEventHandler((event) => {
  const generateRandomString = function (length: number) {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  const scope =
    "streaming \
               user-read-email \
               user-read-private \
               user-read-playback-state";

  const state = generateRandomString(16);

  const auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: import.meta.env["VITE_SPOTIFY_CLIENT_ID"],
    scope: scope,
    redirect_uri: "http://localhost:4200/api/v1/spotify-callback",
    state: state,
  });

  return sendRedirect(
    event,
    "https://accounts.spotify.com/authorize/?" +
      auth_query_parameters.toString(),
  );
});
