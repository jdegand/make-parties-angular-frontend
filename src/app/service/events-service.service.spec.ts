import { of } from 'rxjs';
import { EventsService } from './events-service.service';

describe('EventsService', () => {
  let service: EventsService;

  let httpClientSpy: any;

  beforeEach(() => {

    httpClientSpy = {
      get: jest.fn(),
      getById: jest.fn(),
      put: jest.fn(),
      post: jest.fn(),
      delete: jest.fn()
    }

    service = new EventsService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getEvents', () => {

    const response = [
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
      {
        "eventId": 2,
        "title": "BBQ",
        "desc": "Burgers and Hot Dogs",
        "imgUrl": "https://picsum.photos/200/300",
        "takesPlaceOn": "2023-09-07T00:00:00.000+00:00",
        "createdAt": "2023-07-08T23:35:05.228+00:00",
        "updatedAt": "2023-07-08T23:35:05.228+00:00",
        "rsvps": []
      }
    ];

    const url = 'http://localhost:8080/events';

    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(response));

    service.getEvents();
    expect(httpClientSpy.get).toBeCalled();
    expect(httpClientSpy.get).toBeCalledWith(url);
  });

  it('postEvent', ()=> {

    const response = {
      "eventId": 1,
      "title": "Birthday Party",
      "desc": "Pony Rides",
      "imgUrl": "https://picsum.photos/200/300",
      "takesPlaceOn": null,
      "createdAt": "2023-07-08T23:34:40.497+00:00",
      "updatedAt": "2023-07-08T23:34:40.497+00:00",
      "rsvps": []
    };

    const payload = {
      "title": "Birthday Party",
      "desc": "Pony Rides",
      "imgUrl": "https://picsum.photos/200/300",
      "takesPlaceOn": null,
    };

    const url = 'http://localhost:8080/events';

    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(response));

    service.postEvent(payload);

    expect(httpClientSpy.post).toBeCalled();
    expect(httpClientSpy.post).toBeCalledWith(url, payload);
  })

  it('getEventById', ()=> {

    const response = {
      "eventId": 1,
      "title": "Birthday Party",
      "desc": "Pony Rides",
      "imgUrl": "https://picsum.photos/200/300",
      "takesPlaceOn": null,
      "createdAt": "2023-07-08T23:34:40.497+00:00",
      "updatedAt": "2023-07-08T23:34:40.497+00:00",
      "rsvps": []
    };

    const id = '1';

    const url = `http://localhost:8080/events/${id}`;

    jest.spyOn(httpClientSpy, 'getById').mockReturnValue(of(response));

    service.getEventById(id);

    expect(httpClientSpy.get).toBeCalled();
    expect(httpClientSpy.get).toBeCalledWith(url);
  })

  it('deleteEventById', ()=> {

    const response = {
      "eventId": 1,
      "title": "Birthday Party",
      "desc": "Pony Rides",
      "imgUrl": "https://picsum.photos/200/300",
      "takesPlaceOn": null,
      "createdAt": "2023-07-08T23:34:40.497+00:00",
      "updatedAt": "2023-07-08T23:34:40.497+00:00",
      "rsvps": []
    };

    const id = '1';

    const url = `http://localhost:8080/events/${id}`;

    jest.spyOn(httpClientSpy, 'delete').mockReturnValue(of(response));

    service.getEventById(id);

    expect(httpClientSpy.get).toBeCalled();
    expect(httpClientSpy.get).toBeCalledWith(url);
  })


});
