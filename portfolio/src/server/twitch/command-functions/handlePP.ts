import { ChatMessageEvent } from "../events.model";
import { SendChatMessage } from "../externalRequests/sendChatMessage";

const goodOutcomes = [
  "Baseball Bat",
  "Columbian Long Banana",
  "Eggplant",
  "Rocket Ship",
  "Soda Can",
  "Costco Glizzy",
];
const badOutcomes = [
  "Pancake",
  "Mechanical Pencil",
  "Burnt Patty",
  "Chopstick",
];

const allOutcomes = [...goodOutcomes, ...badOutcomes];

const goodUsers = ["certified_nut, anistrae"];
const badUsers = ["andy68758"];

export async function HandlePP(event: ChatMessageEvent) {
  let result = "";

  if (goodUsers.includes(event.chatter_user_name.toLowerCase())) {
    result = doGoodUser();
  } else if (badUsers.includes(event.chatter_user_name.toLowerCase())) {
    result = doBadUser();
  } else {
    result = doUser();
  }

  await SendChatMessage(`@${event.chatter_user_name} has a ${result}.`);
}

function doGoodUser() {
  return goodOutcomes[Math.floor(Math.random() * goodOutcomes.length)];
}

function doBadUser() {
  return badOutcomes[Math.floor(Math.random() * badOutcomes.length)];
}

function doUser() {
  return allOutcomes[Math.floor(Math.random() * allOutcomes.length)];
}
