import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CreateEventSubscriptionDto} from "../../../shared/dtos/twitch/eventSubscriptionDtos";

@Injectable({
  providedIn: 'root'
})
export default class TwitchService {

  constructor(private http: HttpClient) {
  }

  registerSubscription(body: CreateEventSubscriptionDto) {
    return this.http.post('/api/v1/twitch/subscription/register', body)
  }
}
