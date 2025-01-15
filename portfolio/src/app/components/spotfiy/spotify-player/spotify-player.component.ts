import {
  Component,
  computed,
  effect,
  input,
  resource,
  signal,
  WritableSignal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { TestTrack } from "../../../pages/(spotify)/spotify/(display)/display.page";
import { prominent } from "color.js";
import Color from "colorjs.io";

@Component({
  selector: "spotify-player",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./spotify-player.component.html",
  styleUrl: "./spotify-player.component.scss",
})
export class SpotifyPlayerComponent {
  currentTrack$$ = input(TestTrack);

  songDuration$$ = input(TestTrack.duration_ms);
  songPosition$$ = input(TestTrack.duration_ms - 10000);

  convertedSongDuration$$ = computed(() => {
    const date = new Date(0, 0, 0, 0, 0, 0);
    date.setMilliseconds(this.songDuration$$());
    return date;
  });
  convertedSongPosition$$ = computed(() => {
    const date = new Date(0, 0, 0, 0, 0, 0);
    date.setMilliseconds(this.songPosition$$());
    return date;
  });

  calculatePercent$$ = computed(() => {
    const total = this.songDuration$$();
    const progress = this.songPosition$$();
    return Math.min((progress / total) * 100, 100);
  });

  albumArtResource$$ = resource({
    request: () => ({ url: this.currentTrack$$().album.images[0].url }),
    loader: ({ request }) => {
      return fetch(request.url);
    },
  });
  private _artEffect = effect(() => {
    this.albumArtResource$$
      .value()
      ?.blob()
      .then((blob) => {
        this.albumUrl$$.set(URL.createObjectURL(blob));
        prominent(URL.createObjectURL(blob), {
          amount: 5,
          format: "hex",
          group: 40,
        }).then((color) => {
          this.prominentColors$$.set(color as string[]);
        });
      });
  });
  prominentColors$$: WritableSignal<string[]> = signal([]);

  private _contrastEffect;

  trackArtists$$ = computed(() => {
    return this.currentTrack$$()
      .artists.map((artist: { name: string }) => artist.name)
      .join(", ");
  });

  barColor$$ = signal("white");
  titleGrad1$$ = signal("white");
  titleGrad2$$ = signal("white");
  leftoverColors$$: WritableSignal<string[]> = signal([]);
  shadowColor$$ = signal("white");

  albumUrl$$: WritableSignal<string | null> = signal(null);

  interval: any;

  constructor() {
    this._contrastEffect = effect(() => {
      if (this.prominentColors$$().length === 0) return;
      let contrast = 0;
      let primary = -1;
      let grad1 = -1;
      let grad2 = -1;
      for (let i = 0; i < this.prominentColors$$().length; i++) {
        const primaryTest = new Color(this.prominentColors$$()[i]);
        for (let j = 0; j < this.prominentColors$$().length; j++) {
          if (j !== i) {
            const grad1Test = new Color(this.prominentColors$$()[j]);
            for (let k = 0; k < this.prominentColors$$().length; k++) {
              if (k !== i && j !== k) {
                const grad2Test = new Color(this.prominentColors$$()[k]);
                const contrast1 = primaryTest.contrastWCAG21(grad1Test);
                const contrast2 = primaryTest.contrastWCAG21(grad2Test);
                const average = (contrast1 + contrast2) / 2;
                if (average > contrast) {
                  primary = i;
                  grad1 = j;
                  grad2 = k;
                  contrast = average;
                }
              }
            }
          }
        }
      }
      this.barColor$$.set(this.prominentColors$$()[primary]);
      this.titleGrad1$$.set(this.prominentColors$$()[grad1]);
      this.titleGrad2$$.set(this.prominentColors$$()[grad2]);
      const leftovers = [];
      const inUse = [primary, grad1, grad2];
      for (let i = 0; i < this.prominentColors$$().length; i++) {
        if (!inUse.includes(i)) {
          leftovers.push(this.prominentColors$$()[i]);
        }
      }
      const blackContrast = new Color(this.barColor$$()).contrastWCAG21(
        new Color("black"),
      );
      const whiteContrast = new Color(this.barColor$$()).contrastWCAG21(
        new Color("white"),
      );

      if (blackContrast > whiteContrast) {
        this.shadowColor$$.set("black");
      } else {
        this.shadowColor$$.set("white");
      }
      this.leftoverColors$$.set(leftovers);
    });
  }
}
