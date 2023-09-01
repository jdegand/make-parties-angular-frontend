import { RsvpService } from './rsvp-service.service';
import { of } from 'rxjs';

describe('RsvpService', () => {
  let service: RsvpService;

  let httpClientSpy: any;

  beforeEach(() => {

    httpClientSpy = {
      post: jest.fn(),
      delete: jest.fn()
    }

    service = new RsvpService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('postEvent', ()=> {

    const response = {
      "rsvpId": 1,
      "name": "Jim",
      "email": "jim@gmail.com",
    };

    const payload = {
      "name": "Jim",
      "email": "jim@gmail.com",
    };

    const eventId = '1';

    const url = `http://localhost:8080/events/${eventId}/rsvps`;

    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(response));

    service.postRsvp(eventId, payload);

    expect(httpClientSpy.post).toHaveBeenCalled();
    expect(httpClientSpy.post).toHaveBeenCalledWith(url, payload);
  })

  it('deleteRsvp', ()=> {

    const response = {
      "message": "Rsvp 1 deleted"
    };

    const eventId = '1';

    const rsvpId = '1';

    const url = `http://localhost:8080/events/${eventId}/rsvps/${rsvpId}`;

    jest.spyOn(httpClientSpy, 'delete').mockReturnValue(of(response));

    service.deleteRsvp(eventId, rsvpId);

    expect(httpClientSpy.delete).toHaveBeenCalled();
    expect(httpClientSpy.delete).toHaveBeenCalledWith(url);
  })

});
