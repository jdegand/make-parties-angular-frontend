import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpFormComponent } from './rsvp-form.component';
import { RsvpService } from '../service/rsvp-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

describe('RsvpFormComponent', () => {
  let component: RsvpFormComponent;
  let fixture: ComponentFixture<RsvpFormComponent>;

  let mockRsvpService = jasmine.createSpyObj('RsvpService', ['postRsvp']);

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
      imports: [RsvpFormComponent, ReactiveFormsModule, NoopAnimationsModule],
      providers: [
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
    fixture = TestBed.createComponent(RsvpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cancel()', ()=> {
    
    const spyformReset = spyOn(component.rsvpInfo, 'reset').and.callThrough();
    component.cancel();
    expect(spyformReset).toHaveBeenCalled();
  });

  it('submit()', ()=> {

    let mockRsvp = {
      "name" : "Alice",
      "email": "alice@gmail.com"
    }

    component.rsvpInfo.setValue({
      "name" : "Alice",
      "email": "alice@gmail.com"
    });

    component.eventId = '1';

    mockRsvpService.postRsvp.and.returnValue(of(mockRsvp));

    component.submit();

    fixture.detectChanges();

    expect(mockRsvpService.postRsvp).toHaveBeenCalled();
  })

  it('submit() error', ()=> {

    component.rsvpInfo.setValue({
      "name" : "Alice",
      "email": "alice@gmail.com"
    });

    component.eventId = '1';

    mockRsvpService.postRsvp.and.returnValue(throwError(() => new Error()));

    component.submit();

    fixture.detectChanges();

    expect(mockRsvpService.postRsvp).toHaveBeenCalled();
  })


});
