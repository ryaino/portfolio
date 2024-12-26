///<reference types="@types/spotify-web-playback-sdk"/>

import {
  afterNextRender,
  Component,
  computed,
  effect,
  ElementRef, inject, NgZone,
  OnInit, PLATFORM_ID,
  resource,
  signal,
  WritableSignal
} from '@angular/core';

import {DatePipe, isPlatformBrowser, NgStyle} from '@angular/common';

import {HttpClient} from '@angular/common/http';
import { prominent,  } from 'color.js'
import Color from 'colorjs.io';

@Component({
  selector: 'portfolio-spotify-display',
  standalone: true,
  imports: [
    DatePipe,
    NgStyle
  ],
  templateUrl: './display.page.html',
  styleUrl: './display.page.scss'
})
export default class SpotifyDisplayPageComponent {
  currentTrack$$ : WritableSignal<any> = signal(TestTrack);
  songDuration$$: WritableSignal<number> = signal(TestTrack.duration_ms);
  songPosition$$: WritableSignal<number> = signal(TestTrack.duration_ms - 10000);

  convertedSongDuration$$ = computed(() => {
    const date = new Date(0,0,0,0,0,0);
    date.setMilliseconds(this.songDuration$$())
    return date;
  });
  convertedSongPosition$$ = computed(() => {
    const date = new Date(0,0,0,0,0,0);
    date.setMilliseconds(this.songPosition$$())
    return date;
  })

  calculatePercent$$ = computed(() => {
    const total = this.songDuration$$();
    const progress = this.songPosition$$();
    return Math.min(progress / total * 100, 100);
  });

  albumArtResource$$ = resource({
    request: () => ({url: this.currentTrack$$().album.images[0].url}),
    loader: ({request}) => {
      return fetch(request.url);
    }
  })
  private _artEffect = effect( () => {
    this.albumArtResource$$.value()?.blob().then(blob => {
      this.albumUrl$$.set(URL.createObjectURL(blob));
      prominent(URL.createObjectURL(blob), { amount: 5, format: 'hex', group: 40  }).then((color) => {
        this.prominentColors$$.set(color as string[])
      })
    })
  })

  prominentColors$$: WritableSignal<string[]> = signal([]);

  private _contrastEffect ;

  trackArtists$$ = computed(() => {
    return this.currentTrack$$().artists.map((artist: {name: string}) => artist.name).join(', ')
  })

  barColor$$ = signal('white');
  titleGrad1$$ = signal('white');
  titleGrad2$$ = signal('white');
  leftoverColors$$:WritableSignal<string[]> = signal([]);
  shadowColor$$ = signal('white');


  albumUrl$$: WritableSignal<string | null> = signal(null)

  interval: any;
  platformId = inject(PLATFORM_ID);

  constructor(private zone: NgZone) {
    if(isPlatformBrowser(this.platformId))  {
      this.doSpotify()
      this._contrastEffect = effect(() => {
        if(this.prominentColors$$().length === 0) return
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
                    contrast = average
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
        const blackContrast = new Color(this.barColor$$()).contrastWCAG21(new Color('black'));
        const whiteContrast = new Color(this.barColor$$()).contrastWCAG21(new Color('white'));

        if ( blackContrast > whiteContrast ) {
          this.shadowColor$$.set('black')
        } else {
          this.shadowColor$$.set('white')
        }
        this.leftoverColors$$.set(leftovers);
      });
    }
  }

  doSpotify() {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.type = 'text/javascript';
    script.addEventListener('load', (e) => {
      console.log(e);
    });
    document.head.appendChild(script);
    window.onSpotifyWebPlaybackSDKReady = async () => {
      const token = import.meta.env['VITE_TEST_CODE'];
      const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => {
          cb(token);
        },
        volume: 0.5
      });

      player.addListener('ready', ({ device_id }) => {
      });
      player.addListener('player_state_changed',
        ({
           position,
           duration,
           track_window: {current_track}
         }) => {

          this.currentTrack$$.set(current_track);
          this.songDuration$$.set(duration);
          this.songPosition$$.set(position);
        });
     this.interval = setInterval(() => {
        if (this.songPosition$$() < this.songDuration$$()) {
          const newPosition = this.songPosition$$() + 1000;
          this.songPosition$$.set(newPosition);
        }
      },1000);
      await player.setVolume(0.1);
      await player.activateElement();
      await player.connect();
    }
  }
}

export const TestTrack = {
  "id": "4oCQCkMewRYg5fmK2aotPL",
  "uri": "spotify:track:4oCQCkMewRYg5fmK2aotPL",
  "type": "track",
  "uid": "9cc287b84d411919b600",
  "linked_from": {
    "uri": null,
    "id": null
  },
  "media_type": "audio",
  "track_type": "audio",
  "content_type": "music",
  "name": "B3ND_BUDGE",
  "duration_ms": 174000,
  "artists": [
    {
      "name": "Belmont",
      "uri": "spotify:artist:6hxiY0CFXTibGUtp8TdCxp"
    }
  ],
  "album": {
    "uri": "spotify:album:0WrtmOTnb3dLugmxuXWIrk",
    "name": "Liminal",
    "images": [
      {
        "url": "https://i.scdn.co/image/ab67616d0000b27304deaebcb9faabf5988a317c",
        "height": 640,
        "width": 640
      },
      {
        "url": "https://i.scdn.co/image/ab67616d0000485104deaebcb9faabf5988a317c",
        "height": 64,
        "width": 64
      },
      {
        "url": "https://i.scdn.co/image/ab67616d00001e0204deaebcb9faabf5988a317c",
        "height": 300,
        "width": 300
      }
    ]
  },
  "is_playable": true,
  "metadata": {}
}

