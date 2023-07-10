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

  //event$: any = undefined;

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

    //this.event$ = this.eventsService.getEvents();

    // Using async pipe is fine -> closes subscription automatically / easy to implement / etc
    // problem is trying to show something when it returns without data
    // Ran into typing issues - the return value is an not array ? 

    this.eventsService.getEvents().subscribe(
      {
        next: (data) => {
          console.log(typeof data); // object -> problem because backend returns a list?
          this.events = data;
        },
        error: (e) => this.error = e,
        complete: () => console.info('complete')
      }
    );

  }
  
}
