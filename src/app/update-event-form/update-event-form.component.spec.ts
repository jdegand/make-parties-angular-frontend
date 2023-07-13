import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEventFormComponent } from './update-event-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventsService } from '../service/events-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cancel()', ()=> {
    const spyformReset = spyOn(component.updatedEventInfo, 'reset').and.callThrough();
    component.cancel();
    expect(spyformReset).toHaveBeenCalled();
  });

});
