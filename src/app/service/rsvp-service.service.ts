import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RsvpService {

  constructor(private http: HttpClient) { }

  postRsvp(eventId: string | null | undefined, payload: any){
    return this.http.post(`http://localhost:8080/events/${eventId}/rsvps`, payload);
  }

  deleteRsvp(eventId: string | null | undefined, rsvpId: string | null | undefined){
    return this.http.delete(`http://localhost:8080/events/${eventId}/rsvps/${rsvpId}`);
  }
}
