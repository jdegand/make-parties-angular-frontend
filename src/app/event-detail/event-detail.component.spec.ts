import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailComponent } from './event-detail.component';
import { EventsService } from '../service/events-service.service';
import { RsvpService } from '../service/rsvp-service.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('EventDetailComponent', () => {
  let component: EventDetailComponent;
  let fixture: ComponentFixture<EventDetailComponent>;
  let mockEventsService = jasmine.createSpyObj('EventsService', ['getEventById', 'deleteEvent']);
  let mockRsvpService = jasmine.createSpyObj('RsvpService', ['deleteRsvp']);

  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

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
          provide: EventsService, useValue: mockEventsService
        },
        {
          provide: RsvpService, useValue: mockRsvpService
        },
        { 
          provide: ActivatedRoute, useValue: mockActivatedRoute 
        },
        {
          provide: Router, useValue: mockRouter
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
