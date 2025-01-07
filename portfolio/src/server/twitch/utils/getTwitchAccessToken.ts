import { db } from "../../plugins/db-setup";
import {
  NewTwitchApplication,
  TwitchApplication,
  twitchApplication,
} from "../../../db/schema/twitchApplication";
import { RefreshAccessToken } from "../externalRequests/refreshAccessToken";
import { eq } from "drizzle-orm";

export default async function GetTwitchAccessToken() {
  const query = await db
    .select()
    .from(twitchApplication)
    .where(eq(twitchApplication.id, 1));
  if (query.length > 0) {
    const existingToken: TwitchApplication = query[0];
    const now = Date.now();
    if (existingToken.expiresAt <= now) {
      const refreshedToken = await RefreshAccessToken();
      const newToken: NewTwitchApplication = {
        access_token: refreshedToken.access_token,
        expiresAt: Date.now() + refreshedToken.expires_in,
      };
      await db
        .update(twitchApplication)
        .set(newToken)
        .where(eq(twitchApplication.id, existingToken.id));
      return refreshedToken.access_token;
    } else {
      return existingToken.access_token;
    }
  } else {
    const refreshedToken = await RefreshAccessToken();
    const newToken: NewTwitchApplication = {
      access_token: refreshedToken.access_token,
      expiresAt: Date.now() + refreshedToken.expires_in,
    };
    await db.insert(twitchApplication).values(newToken);
    return refreshedToken.access_token;
  }
}
