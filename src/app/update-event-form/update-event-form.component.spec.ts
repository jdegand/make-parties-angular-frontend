import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEventFormComponent } from './update-event-form.component';
import { EventsService } from '../service/events-service.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('UpdateEventFormComponent', () => {
  let component: UpdateEventFormComponent;
  let fixture: ComponentFixture<UpdateEventFormComponent>;
  let eventsServiceMock: any;
  let eventService: EventsService;
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
      imports: [UpdateEventFormComponent], 
      providers: [
        {
          provide: EventsService,
          useValue: eventsServiceMock
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
    fixture = TestBed.createComponent(UpdateEventFormComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
