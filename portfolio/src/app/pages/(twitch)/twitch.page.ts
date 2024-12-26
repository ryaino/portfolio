import {Component, Inject} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {Router} from "@angular/router";
import {HttpParams} from "@angular/common/http";
@Component({
  selector: 'twitch',
  standalone: true,
  imports: [CommonModule],
  styles: ``,
  template: `
    <button (click)="login()">
      Login
    </button>
  `
})
export default class TwitchPage {

  constructor(@Inject(DOCUMENT) private document: Document) {
    const eventSource = new EventSource('/api/v1/twitch/sse')

    eventSource.onmessage = (event) => {
      console.log(event.data)
    }
  }

  login() {

    const params = new HttpParams()
      .set('client_id', import.meta.env['VITE_TWITCH_APPLICATION_CLIENT_ID'])
      .set('redirect_uri', 'http://localhost:4200/api/v1/twitch/callback')
      .set('response_type', 'code')
      .set('scope', 'channel:bot');

    this.document.location.href = 'https://id.twitch.tv/oauth2/authorize?' + params.toString();

  }
}
