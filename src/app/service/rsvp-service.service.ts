import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RsvpObj } from '../interfaces/RsvpObj';

@Injectable({
  providedIn: 'root'
})
export class RsvpService {

  constructor(private http: HttpClient) { }

  postRsvp(eventId: string, payload: Partial<RsvpObj>){
    return this.http.post(`http://localhost:8080/events/${eventId}/rsvps`, payload);
  }

  deleteRsvp(eventId: string, rsvpId: string){
    return this.http.delete(`http://localhost:8080/events/${eventId}/rsvps/${rsvpId}`);
  }
}
