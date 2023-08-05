import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailComponent } from './event-detail.component';
import { EventsService } from '../service/events-service.service';
import { RsvpService } from '../service/rsvp-service.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('EventDetailComponent', () => {
  let component: EventDetailComponent;
  let fixture: ComponentFixture<EventDetailComponent>;
  let eventsServiceMock: any;
  let eventService: EventsService;
  let rsvpServiceMock: any;
  let rsvpService: RsvpService
  let routerMock: any;
  
  let mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => {
          return '1';
        },
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EventDetailComponent],
      providers: [
        {
          provide: EventsService,
          useValue: eventsServiceMock
        },
        {
          provide: RsvpService,
          useValue: rsvpServiceMock
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
        {
          provide: Router,
          useValue: routerMock
        }
      ]
    });
    fixture = TestBed.createComponent(EventDetailComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
