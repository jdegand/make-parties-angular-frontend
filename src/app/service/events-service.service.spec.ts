import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EventsService } from './events-service.service';

describe('EventsService', () => {
  let service: EventsService;
  let testingController: HttpTestingController;

  const mockEvents: any = [
    {
      "eventId": '1',
      "title": "BBQ",
      "desc": "Ribs!!!",
      "imgUrl": "https://picsum.photos/200/200",
      "takesPlaceOn": null,
      "createdAt": "2023-06-30T23:09:28.135+00:00",
      "updatedAt": "2023-06-30T23:09:28.135+00:00",
      "rsvps": []
    }, {
      "eventId": '2',
      "title": "Camping",
      "desc": "Roughing it",
      "imgUrl": "https://picsum.photos/200/200",
      "takesPlaceOn": null,
      "createdAt": "2023-06-30T23:09:28.135+00:00",
      "updatedAt": "2023-06-30T23:09:28.135+00:00",
      "rsvps": []
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EventsService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getEvents()', () => {
    service.getEvents().subscribe((data: any) => {
      expect(data).toBeTruthy();
      expect(data.length).toBe(2);
      const secondUser = mockEvents.find((event: any) => event.eventId === '2');
      expect(secondUser.title).toBe("Camping");
    })

    const mockReq = testingController.expectOne("http://localhost:8080/events");
    expect(mockReq.request.method).toEqual("GET");
    mockReq.flush(mockEvents);
  })

  it('getEventById()', () => {
    service.getEventById('1').subscribe((data: any) => {
      expect(data).toBeTruthy();
      expect(data.desc).toBe("Ribs!!!");
    })

    const mockReq = testingController.expectOne("http://localhost:8080/events/1");
    expect(mockReq.request.method).toEqual("GET");
    mockReq.flush(mockEvents[0]);
  })

  it('postEvent()', () => {
    let payload = {
      "title": "Event 3",
      "desc": "event 3 description",
      "imgUrl": "https://picsum.photos/200/200",
      "takesPlaceOn": null,
    };
    service.postEvent(payload).subscribe((data: any) => {
      expect(data).toBeTruthy();
      expect(data.title).toBe('Event 3');
    })

    const mockReq = testingController.expectOne("http://localhost:8080/events");
    expect(mockReq.request.method).toEqual("POST");
    mockReq.flush(payload);
  })

  it('updateEvent()', () => {
    let changes = { desc: "Fun outdoors" };
    service.updateEvent('2', changes).subscribe((data: any) => {
      expect(data).toBeTruthy();
      expect(data.eventId).toBe('2');
    })

    const mockReq = testingController.expectOne("http://localhost:8080/events/2");
    expect(mockReq.request.method).toEqual("PUT");
    let modifiedEvent = mockEvents[1];
    modifiedEvent.desc = "Fun outdoors";
    expect(mockReq.request.body.desc).toEqual(changes.desc);
    mockReq.flush(modifiedEvent);
  })

  it('deleteEvent()', () => {
    service.deleteEvent('2').subscribe((data: any) => {
      expect(data.message).toBe('event 2 deleted');
    })

    const mockReq = testingController.expectOne("http://localhost:8080/events/2");
    expect(mockReq.request.method).toEqual("DELETE");

    mockReq.flush({ message: 'event 2 deleted' });
  })

  afterEach(() => {
    testingController.verify();
  })

});
