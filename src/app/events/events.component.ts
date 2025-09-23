import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from '../service/events-service.service';
import { CardComponent } from '../card/card.component';
import { EventObj } from '../interfaces/EventObj';
import { ErrorObj } from '../interfaces/ErrorObj';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: EventObj[] = [];
  error: ErrorObj | null = null;

  constructor(private readonly eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.getEvents().subscribe(
      {
        next: (data) => {
          this.events = data as EventObj[];
        },
        error: (e) => this.error = e,
        complete: () => console.info('complete')
      }
    );
  }
  
}
