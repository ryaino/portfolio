import { Component, input, InputSignal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChatMessage } from "../../../../shared/twitch/chat-message.model";

@Component({
  selector: "twitch-chat",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./twitch-chat.component.html",
  styleUrl: "./twitch-chat.component.scss",
})
export class TwitchChatComponent {
  chatMessages: InputSignal<ChatMessage[]> = input([] as ChatMessage[]);
}
