import {
  Component,
  inject,
  Inject,
  OnInit,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from "@angular/core";
import {
  CommonModule,
  DOCUMENT,
  isPlatformBrowser,
  NgOptimizedImage,
} from "@angular/common";
import { HttpParams } from "@angular/common/http";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import TwitchService from "./twitch.service";
import { firstValueFrom } from "rxjs";
import { TwitchChatComponent } from "../../components/twitch/twitch-chat/twitch-chat.component";
import { ChatMessage } from "../../../shared/twitch/chat-message.model";
import { FirstInteractionMessage } from "../../../shared/twitch/first-interaction.model";

@Component({
  selector: "twitch",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TwitchChatComponent,
    NgOptimizedImage,
  ],
  styles: ``,
  template: `
    <div>
      <button (click)="login()">Login</button>
    </div>
    <div>
      <input [formControl]="webhookUrl" type="text" placeholder="webhook url" />
      <input
        [formControl]="subscriptionType"
        type="text"
        placeholder="subscription type"
      />
      <input [formControl]="version" type="text" placeholder="version" />
      <button (click)="registerSubscription()">Register Subscription</button>
    </div>
    <div>
      @if (displayProfilePictureUrl$$() !== null) {
        <img
          class="slide-up-fade-in"
          [ngSrc]="displayProfilePictureUrl$$()!"
          alt=""
          width="100"
          height="100"
        />
      }
    </div>
    <div>
      <twitch-chat [chatMessages]="chatMessages()"></twitch-chat>
    </div>
  `,
})
export default class TwitchPage implements OnInit {
  webhookUrl = new FormControl<string>("", [Validators.required]);
  subscriptionType = new FormControl<string>("", [Validators.required]);
  version = new FormControl<string>("", [Validators.required]);

  chatMessages: WritableSignal<ChatMessage[]> = signal([] as ChatMessage[]);
  displayProfilePictureUrl$$: WritableSignal<string | null> = signal(null);

  platformId = inject(PLATFORM_ID);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private service: TwitchService,
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const chatMessageEventSource = new EventSource(
        "/api/v1/twitch/sse/chat-messages",
      );
      chatMessageEventSource.onmessage = (event: any) => {
        const newMessage = JSON.parse(event.data);
        this.chatMessages.set([...this.chatMessages(), newMessage]);
      };
      const firstInteractionEventSource = new EventSource(
        "/api/v1/twitch/sse/first-interaction",
      );
      firstInteractionEventSource.onmessage = (event: any) => {
        const newMessage = JSON.parse(event.data) as FirstInteractionMessage;
        this.displayProfilePictureUrl$$.set(newMessage.profileImageUrl);
      };
    }
  }

  login() {
    const params = new HttpParams()
      .set("client_id", import.meta.env["VITE_TWITCH_APPLICATION_CLIENT_ID"])
      .set("redirect_uri", "http://localhost:4200/api/v1/twitch/callback")
      .set("response_type", "code")
      .set("scope", "channel:bot");

    this.document.location.href =
      "https://id.twitch.tv/oauth2/authorize?" + params.toString();
  }

  async registerSubscription() {
    await firstValueFrom(
      this.service.registerSubscription({
        webhookUrl: this.webhookUrl.value!,
        subscriptionType: this.subscriptionType.value!,
        version: this.version.value!,
      }),
    );
  }
}
