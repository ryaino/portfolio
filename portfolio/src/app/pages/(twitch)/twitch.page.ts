import {Component, inject, Inject, PLATFORM_ID} from '@angular/core';
import {CommonModule, DOCUMENT, isPlatformBrowser} from '@angular/common';
import {Router} from "@angular/router";
import {HttpParams} from "@angular/common/http";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import TwitchService from "./twitch.service";
import {firstValueFrom} from "rxjs";
@Component({
  selector: 'twitch',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styles: ``,
  template: `
    <div>
      <button (click)="login()">
        Login
      </button>
    </div>
    <div>
      <input [formControl]="webhookUrl" type="text" placeholder="webhook url">
      <input [formControl]="subscriptionType" type="text" placeholder="subscription type">
      <input [formControl]="version" type="text" placeholder="version">
      <button (click)="registerSubscription()"> Register Subscription </button>
    </div>
  `
})
export default class TwitchPage {

  webhookUrl = new FormControl<string>('', [Validators.required]);
  subscriptionType = new FormControl<string>('', [Validators.required]);
  version = new FormControl<string>('', [Validators.required]);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private service: TwitchService
    ) {
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

  async registerSubscription() {
    await firstValueFrom(
      this.service.registerSubscription(
        {
          webhookUrl: this.webhookUrl.value!,
          subscriptionType: this.subscriptionType.value!,
          version: this.version.value!,
        },)
  );
  }
}
