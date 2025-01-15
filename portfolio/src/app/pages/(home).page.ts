import { Component, Inject, OnInit } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "portfolio-home",
  standalone: true,
  imports: [],
  template: ``,
})
export default class HomeComponent implements OnInit {
  constructor(private http: HttpClient) {}

  async ngOnInit() {
    const state = await firstValueFrom(
      this.http.get("/api/v1/spotify/player-state"),
    );
  }
}
