import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsComponent } from './events.component';
import { EventsService } from '../service/events-service.service';
import { of } from 'rxjs';

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;
  let eventsServiceMock: any;
  let service: EventsService;

  beforeEach(() => {
    eventsServiceMock = {
      getEvents: jest.fn()
    }

    TestBed.configureTestingModule({
      imports: [EventsComponent],
      providers: [
        {
          provide: EventsService,
          useValue: eventsServiceMock
        }
      ]
    });
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('eventsService.getEvents() sets events', () => {
    const expectedResponse = [
      {
        "eventId": 1,
        "title": "Birthday Party",
        "desc": "Pony Rides",
        "imgUrl": "https://picsum.photos/200/300",
        "takesPlaceOn": "2023-09-07T00:00:00.000+00:00",
        "createdAt": "2023-07-08T23:34:40.497+00:00",
        "updatedAt": "2023-07-08T23:34:40.497+00:00",
        "rsvps": []
      },
    ];

    jest.spyOn(eventsServiceMock, 'getEvents').mockReturnValue(of(expectedResponse));
    fixture.detectChanges();

    expect(component.events).toEqual(expectedResponse);
  })
});
