import { Component, computed, input, InputSignal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChatMessage } from "../../../../shared/twitch/chat-message.model";
import { messages } from "nx/src/utils/ab-testing";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "twitch-chat",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./twitch-chat.component.html",
  styleUrl: "./twitch-chat.component.scss",
})
export class TwitchChatComponent {
  chatMessages: InputSignal<ChatMessage[]> = input([] as ChatMessage[]);

  emotes$$ = computed(() => {
    return this.chatMessages().map((chatMessage: ChatMessage) => {
      let constructedMessage = "";
      chatMessage.message.fragments.forEach((fragment) => {
        if (fragment.emote === null) {
          constructedMessage += `${fragment.text}`;
        } else {
          let type = "static";
          if (fragment.emote.format.includes("animated")) {
            type = "animated";
          }
          constructedMessage += `<img src="https://static-cdn.jtvnw.net/emoticons/v2/${fragment.emote.id}/${type}/light/1.0"/>`;
        }
      });
      return {
        color: chatMessage.color,
        chatterName: chatMessage.chatterName,
        text: this.sanitizer.bypassSecurityTrustHtml(constructedMessage),
      };
    });
  });

  constructor(private sanitizer: DomSanitizer) {}
}
