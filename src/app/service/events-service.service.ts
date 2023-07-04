import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  postEvent(payload: any){
    return this.http.post('http://localhost:8080/events', payload);
  }

  getEvents(){
    return this.http.get('http://localhost:8080/events');
  }

  deleteEvent(id: String){
    return this.http.delete(`http://localhost:8080/events/${id}`);
  }

  getEventById(id: String){
    return this.http.get(`http://localhost:8080/events/${id}`);
  }

  updateEvent(id: String, payload: any){
    return this.http.put(`http://localhost:8080/events/${id}`, payload);
  }

}
