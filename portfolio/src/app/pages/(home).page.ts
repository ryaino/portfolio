import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'portfolio-home',
  standalone: true,
  imports: [AnalogWelcomeComponent],
  template: `
     <portfolio-analog-welcome/>
  `,
})
export default class HomeComponent {
}
