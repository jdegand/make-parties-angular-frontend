import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RsvpService } from './rsvp-service.service';

describe('RsvpService', () => {
  let service: RsvpService;

  let testingController: HttpTestingController;

  const mockRsvps: any = [
    {
      "rsvpId": '1',
      "name": "Alice",
      "email": "alice@gmail.com",
    }, {
      "rsvpId": '2',
      "name": "Missy",
      "email": "missy@gmail.com",
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RsvpService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('postRsvp()', () => {
    let payload = {
      "name": "mark",
      "email": "mark@gmail.com",
    };
    service.postRsvp('1', payload).subscribe((data: any) => {
      expect(data).toBeTruthy();
      expect(data.name).toBe('mark');
    })

    const mockReq = testingController.expectOne("http://localhost:8080/events/1/rsvps");
    expect(mockReq.request.method).toEqual("POST");
    mockReq.flush(payload);
  })

  it('deleteRsvp()', () => {
    service.deleteRsvp('1','2').subscribe((data: any) => {
      expect(data).toBeNull();
    })

    const mockReq = testingController.expectOne("http://localhost:8080/events/1/rsvps/2");
    expect(mockReq.request.method).toEqual("DELETE");

    mockReq.flush(null);
  })

});
