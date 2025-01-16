import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEventFormComponent } from './update-event-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventsService } from '../service/events-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

describe('UpdateEventFormComponent', () => {
  let component: UpdateEventFormComponent;
  let fixture: ComponentFixture<UpdateEventFormComponent>;

  let mockEventsService = jasmine.createSpyObj('EventsService', ['getEventById', 'updateEvent']);

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

  let mockPreviousEvent: any;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [UpdateEventFormComponent, ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        {
          provide: EventsService, useValue: mockEventsService
        },
        {
          provide: ActivatedRoute, useValue: mockActivatedRoute
        },
        {
          provide: Router, useValue: mockRouter
        }
      ]
    });
    fixture = TestBed.createComponent(UpdateEventFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cancel()', () => {
    const spyformReset = spyOn(component.updatedEventInfo, 'reset').and.callThrough();
    component.cancel();
    expect(spyformReset).toHaveBeenCalled();
  });

  it('getEvent()', () => {
    mockPreviousEvent = {
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

    mockEventsService.getEventById.and.returnValue(of(mockPreviousEvent));

    component.getEvent("1");

    fixture.detectChanges();

    expect(component.previousEventInfo).toEqual(mockPreviousEvent);
  })

  it('getEvent() error', async () => {

    // problem with this test - sometimes works / sometimes fails
    // async error or another test is affecting this test or bad comparison

    const initialValue = component.previousEventInfo;

    mockEventsService.getEventById.and.returnValue(throwError(() => new Error()));

    component.getEvent("6");

    fixture.detectChanges();

    await fixture.whenStable();

    expect(component.previousEventInfo).toEqual(initialValue);
  })

  it('submit()', () => {

    // need to check return values of real post to make sure all properties are added to mock
    let mockPost = {
      "eventId": "1",
      "title": "pneumonoultra",
      "desc": "",
      "imgUrl": "",
      "takesPlaceOn": "2023-07-31"
    }

    component.updatedEventInfo.setValue({
      "title": "pneumonoultra",
      "desc": "",
      "imgUrl": "",
      "takesPlaceOn": "2023-07-31"
    });

    component.eventId = '1';

    mockEventsService.updateEvent.and.returnValue(of(mockPost));

    component.submit();

    fixture.detectChanges();

    expect(mockEventsService.updateEvent).toHaveBeenCalled();
  })

  it('submit() error', () => {

    component.updatedEventInfo.setValue({
      "title": "pneumonoultra",
      "desc": "",
      "imgUrl": "",
      "takesPlaceOn": "2023-07-31"
    });

    component.eventId = '1';

    mockEventsService.updateEvent.and.returnValue(throwError(() => new Error()));

    component.submit();

    fixture.detectChanges();

    expect(mockEventsService.updateEvent).toHaveBeenCalled();
  })

  afterEach(() => {
    mockPreviousEvent = undefined;
  })

});
