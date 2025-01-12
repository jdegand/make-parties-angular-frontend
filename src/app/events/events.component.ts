import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from '../service/events-service.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {

  events: any = undefined;
  error: any = undefined;

  /*
  events = [{
    "eventId": 1,
    "title": "BBQ",
    "desc": "Ribs!!!",
    "imgUrl": "https://picsum.photos/200/200",
    "takesPlaceOn": null,
    "createdAt": "2023-06-30T23:09:28.135+00:00",
    "updatedAt": "2023-06-30T23:09:28.135+00:00",
    "rsvps": []
  },{
    "eventId": 2,
    "title": "Camping",
    "desc": "Roughing it",
    "imgUrl": "https://picsum.photos/200/200",
    "takesPlaceOn": null,
    "createdAt": "2023-06-30T23:09:28.135+00:00",
    "updatedAt": "2023-06-30T23:09:28.135+00:00",
    "rsvps": []
  }];
  */

  constructor(private eventsService: EventsService) { }

  ngOnInit() {

    this.eventsService.getEvents().subscribe(
      {
        next: (data) => {
          this.events = data;
        },
        error: (e) => this.error = e,
        complete: () => console.info('complete')
      }
    );

  }
  
}
