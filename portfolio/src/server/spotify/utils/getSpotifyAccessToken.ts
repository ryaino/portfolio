import { db } from "../../plugins/db-setup";
import { eq } from "drizzle-orm";
import {
  NewSpotifyTokens,
  SpotifyTokens,
  SpotifyTokensTable,
} from "../../../db/schema/spotify_tokens.table";
import { RefreshSpotifyAccessToken } from "../external-requests/refreshSpotifyAccessToken";

export default async function GetSpotifyAccessToken() {
  const query = await db
    .select()
    .from(SpotifyTokensTable)
    .where(eq(SpotifyTokensTable.id, 1));

  const existingTokens: SpotifyTokens = query[0];
  const now = Date.now();
  if (existingTokens.expiresAt <= now) {
    const refreshedToken = await RefreshSpotifyAccessToken(
      existingTokens.refreshToken,
    );
    const newTokens: NewSpotifyTokens = {
      accessToken: refreshedToken.access_token,
      expiresAt: Date.now() + refreshedToken.expires_in,
      refreshToken: refreshedToken.refresh_token,
    };
    await db
      .update(SpotifyTokensTable)
      .set(newTokens)
      .where(eq(SpotifyTokensTable.id, existingTokens.id));
    return refreshedToken.access_token;
  } else {
    return existingTokens.accessToken;
  }
  // const refreshedToken = await RefreshSpotifyAccessToken(existingTokens.refreshToken);
  // const newToken: NewTwitchApplication = {
  //   access_token: refreshedToken.access_token,
  //   expiresAt: Date.now() + refreshedToken.expires_in,
  // };
  // await db.insert(TwitchApplicationTable).values(newToken);
  // return refreshedToken.access_token;
}
