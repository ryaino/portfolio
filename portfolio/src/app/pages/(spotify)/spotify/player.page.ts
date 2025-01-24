import {
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { SpotifyPlayerComponent } from "../../../components/spotfiy/spotify-player/spotify-player.component";
import { HttpClient } from "@angular/common/http";
import { TestTrack } from "./(display)/display.page";
import { firstValueFrom, interval } from "rxjs";

@Component({
  selector: "player",
  standalone: true,
  imports: [CommonModule, SpotifyPlayerComponent],
  template: `
    @if (playerState$$()) {
      <spotify-player
        [currentTrack$$]="playerState$$()['item']"
        [songDuration$$]="playerState$$()['item']['duration_ms']"
        [songPosition$$]="playerState$$()['progress_ms']"
      ></spotify-player>
    }
  `,
  styles: ``,
})
export default class PlayerPage implements OnInit {
  playerState$$: WritableSignal<any> = signal(null);
  platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      interval(2000).subscribe(async (x) => {
        await this.getPlayerState();
      });
    }
  }

  private async getPlayerState() {
    const state = await firstValueFrom(
      this.http.get("/api/v1/spotify/player-state"),
    );
    this.playerState$$.set(state);
  }
}
