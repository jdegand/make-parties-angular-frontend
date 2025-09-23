import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventObj } from '../interfaces/EventObj';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private readonly http: HttpClient) { }

  postEvent(payload: Partial<EventObj>){
    return this.http.post('http://localhost:8080/events', payload);
  }

  getEvents(){
    return this.http.get('http://localhost:8080/events');
  }

  deleteEvent(id: string){
    return this.http.delete(`http://localhost:8080/events/${id}`);
  }

  getEventById(id: string){
    return this.http.get(`http://localhost:8080/events/${id}`);
  }

  updateEvent(id: string, payload: Partial<EventObj>){
    return this.http.put(`http://localhost:8080/events/${id}`, payload);
  }

}
