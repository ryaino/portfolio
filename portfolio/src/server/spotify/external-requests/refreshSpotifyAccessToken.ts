export async function RefreshSpotifyAccessToken(refreshToken: string) {
  const url = "https://accounts.spotify.com/api/token";
  const formData = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const accessTokenHeaders = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization:
      "Basic " +
      Buffer.from(
        import.meta.env["VITE_SPOTIFY_CLIENT_ID"] +
          ":" +
          import.meta.env["VITE_SPOTIFY_CLIENT_SECRET"],
      ).toString("base64"),
  };

  const newToken = await $fetch<{
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
  }>(url, {
    method: "POST",
    headers: accessTokenHeaders,
    body: formData,
  });

  return newToken;
}
