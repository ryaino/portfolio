import {defineEventHandler, getQuery, sendRedirect} from "h3";
import { useStorage } from 'nitropack/runtime';

export default defineEventHandler(async (event) => {
  const code = getQuery(event)['code'];

  const url = 'https://id.twitch.tv/oauth2/token';
  const formData = new URLSearchParams({
    'code': code?.toString() ?? '',
    'client_id': import.meta.env['VITE_TWITCH_APPLICATION_CLIENT_ID'],
    'client_secret': import.meta.env['VITE_TWITCH_APPLICATION_CLIENT_SECRET'],
    'grant_type': 'authorization_code',
    'redirect_uri': 'http://localhost:4200/api/v1/twitch/callback'
  });

  const headers = {
    'Content-Type' : 'application/x-www-form-urlencoded',
  };
  const response = await $fetch<any>(url, {
    method: "POST",
    headers,
    body: formData
  });

  await useStorage().setItem('AndeezNutz',response.access_token)
  return sendRedirect(event, '/');
})
