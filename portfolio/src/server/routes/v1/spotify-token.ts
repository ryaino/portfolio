import {defineEventHandler} from "h3";
import {useStorage} from "nitropack/runtime";

export default defineEventHandler(async () => (
  {access_token: await useStorage().getItem('AndeezNutz')}
))
