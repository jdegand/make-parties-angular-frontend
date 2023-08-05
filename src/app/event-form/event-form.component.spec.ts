import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFormComponent } from './event-form.component';
import { EventsService } from '../service/events-service.service';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('EventFormComponent', () => {
  let component: EventFormComponent;
  let fixture: ComponentFixture<EventFormComponent>;
  let mockEventsService: any;
  let routerMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EventFormComponent, NoopAnimationsModule],
      providers: [
        {
          provide: EventsService,
          useValue: mockEventsService
        },
        {
          provide: Router,
          useValue: routerMock
        }
      ]
    });
    fixture = TestBed.createComponent(EventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
