import {
  EVENT_STREAM_CLIENTS_FIRST_INTERACTIONS,
  InteractedUsers,
  SpecialUsers,
} from "./twitch.globals";
import { GetTwitchUserInformation } from "./externalRequests/getTwitchUserInformation";
import { SendChatMessage } from "./externalRequests/sendChatMessage";
import { FirstInteractionMessage } from "../../shared/twitch/first-interaction.model";

export async function FirstInteraction(chatterName: string) {
  InteractedUsers.push(chatterName);
  const specialUser = SpecialUsers.find(
    (user) => user.lowercaseName === chatterName.toLowerCase(),
  );
  if (specialUser !== undefined) {
    await SendChatMessage(specialUser.firstInteractionMessage);
    const userInformation = await GetTwitchUserInformation(chatterName);
    const message: FirstInteractionMessage = {
      profileImageUrl: userInformation.data[0]?.profile_image_url,
    };
    for (const client of EVENT_STREAM_CLIENTS_FIRST_INTERACTIONS) {
      await client.push({
        data: JSON.stringify(message),
      });
    }
  }
}
