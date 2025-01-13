import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EventDetailComponent } from './event-detail.component';
import { EventsService } from '../service/events-service.service';
import { RsvpService } from '../service/rsvp-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

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

  let mockEvent: any;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getEvent()', () => {
    mockEvent = {
      "eventId": "1",
      "title": "BBQ",
      "desc": "Ribs!!!",
      "imgUrl": "https://picsum.photos/200/200",
      "takesPlaceOn": new Date("2023-09-09"),
      "createdAt": "", // update to real timestamp
      "updatedAt": "",
      "rsvps": [{
        "rsvpId": "1",
        "name": "Jim",
        "email": "jim@gmail.com"
      }]
    };

    component.eventId = "1";

    mockEventsService.getEventById.and.returnValue(of(mockEvent));

    component.getEvent("1");

    fixture.detectChanges();

    expect(mockEventsService.getEventById).toHaveBeenCalled();
  })

  it('getEvent() error', () => {
    mockEvent = {
      "eventId": "1",
      "title": "BBQ",
      "desc": "Ribs!!!",
      "imgUrl": "https://picsum.photos/200/200",
      "takesPlaceOn": new Date("2023-09-09"),
      "createdAt": "",
      "updatedAt": "",
      "rsvps": [{
        "rsvpId": "1",
        "name": "Jim",
        "email": "jim@gmail.com"
      }]
    };

    mockEventsService.getEventById.and.returnValue(throwError(() => new Error()));

    component.getEvent("5");

    fixture.detectChanges();

    // nothing is done with error
    expect(component.event).toBe(undefined);
  })

  it('deleteEvent()', () => {

    mockEvent = {
      "eventId": "1",
      "title": "BBQ",
      "desc": "Ribs!!!",
      "imgUrl": "https://picsum.photos/200/200",
      "takesPlaceOn": new Date("2023-09-09"),
      "createdAt": "",
      "updatedAt": "",
      "rsvps": [{
        "rsvpId": "1",
        "name": "Jim",
        "email": "jim@gmail.com"
      }]
    };

    mockEventsService.getEventById.and.returnValue(of(mockEvent));

    fixture.detectChanges();

    expect(component.event).toEqual(mockEvent);

    mockEventsService.deleteEvent.and.returnValue(of({ message: "event 1 deleted" }));

    component.deleteEvent('1');

    fixture.detectChanges();

    expect(mockEventsService.deleteEvent).toHaveBeenCalled();
  })

  it('deleteEvent() error', () => {

    mockEvent = {
      "eventId": "1",
      "title": "BBQ",
      "desc": "Ribs!!!",
      "imgUrl": "https://picsum.photos/200/200",
      "takesPlaceOn": new Date("2023-09-09"),
      "createdAt": "",
      "updatedAt": "",
      "rsvps": [{
        "rsvpId": "1",
        "name": "Jim",
        "email": "jim@gmail.com"
      }]
    };

    mockEventsService.getEventById.and.returnValue(of(mockEvent));

    fixture.detectChanges();

    expect(component.event).toEqual(mockEvent);

    mockEventsService.deleteEvent.and.returnValue(throwError(() => new Error()));

    component.deleteEvent('4');

    fixture.detectChanges();

    expect(mockEventsService.deleteEvent).toHaveBeenCalled();
  })

  it('should call reloadPage when deleteRsvp is called', fakeAsync(() => {
    // the code coverage says the reloadPage method is uncovered
    // tried many different combinations and nothing's changed

    mockEvent = {
      eventId: "1",
      title: "BBQ",
      desc: "Ribs!!!",
      imgUrl: "https://picsum.photos/200/200",
      takesPlaceOn: new Date("2023-09-09"),
      createdAt: "",
      updatedAt: "",
      rsvps: [{
        rsvpId: "1",
        name: "Jim",
        email: "jim@gmail.com"
      }]
    };

    // Spy on reloadPage method
    spyOn(component, 'reloadPage').and.callFake(() => { });

    // Mock the service calls
    mockEventsService.getEventById.and.returnValue(of(mockEvent));
    mockRsvpService.deleteRsvp.and.returnValue(of(""));

    // Initialize the component and set the event
    component.ngOnInit();
    tick(1000);  // Simulate the asynchronous passage of time

    expect(component.event).toEqual(mockEvent);

    // Call deleteRsvp method
    component.deleteRsvp('1', '1');

    // Simulate the passage of time and ensure Observable completes
    tick(1000);

    // Verify expectations
    expect(mockRsvpService.deleteRsvp).toHaveBeenCalled();
    expect(component.reloadPage).toHaveBeenCalled();
  }));

  it('deleteRsvp() error', () => {

    mockEvent = {
      "eventId": "1",
      "title": "BBQ",
      "desc": "Ribs!!!",
      "imgUrl": "https://picsum.photos/200/200",
      "takesPlaceOn": new Date("2023-09-09"),
      "createdAt": "",
      "updatedAt": "",
      "rsvps": [{
        "rsvpId": "1",
        "name": "Jim",
        "email": "jim@gmail.com"
      }]
    };

    mockEventsService.getEventById.and.returnValue(of(mockEvent));

    fixture.detectChanges();

    expect(component.event).toEqual(mockEvent);

    mockRsvpService.deleteRsvp.and.returnValue(throwError(() => new Error()));

    component.deleteRsvp('1', '1');

    fixture.detectChanges();

    expect(mockRsvpService.deleteRsvp).toHaveBeenCalled();
  })

  afterEach(() => {
    mockEvent = undefined;
  })

});
