import { Component } from '@angular/core';
import {SpotifyLoginComponent} from "../../../components/spotify-login.component";

@Component({
  selector: 'portfolio-spotify',
  standalone: true,
  imports: [
    SpotifyLoginComponent
  ],
  template: `
    <spotify-login></spotify-login>
  `,
})
export default class SpotifyPageComponent {
}
