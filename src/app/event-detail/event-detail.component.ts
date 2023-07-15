import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from '../service/events-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RsvpService } from '../service/rsvp-service.service';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent {

  constructor(private eventsService: EventsService, private route: ActivatedRoute, private rsvpService: RsvpService, private router: Router) { }

  eventId: any;

  event: any = undefined;

  reloadPage(){
    window.location.reload();
  }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get("eventId");

    if (this.eventId !== null) {
      this.getEvent(this.eventId);
    }
  }

  getEvent(eventId: String) {
    return this.eventsService.getEventById(eventId).subscribe(
      {
        next: (data) => this.event = data,
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      }
    );
  }

  deleteRsvp(eventId: String, rsvpId: String) {
    return this.rsvpService.deleteRsvp(eventId, rsvpId).subscribe(
      {
        next: (data) => console.log(data),
        error: (e) => console.error(e),
        complete: () => this.reloadPage()
      }
    );
  }

  deleteEvent(eventId: String){
    return this.eventsService.deleteEvent(eventId).subscribe(
      {
        next: (data) => console.log(data),
        error: (e) => console.error(e),
        complete: () => this.router.navigate(["/"])
      }
    );
  }

}
