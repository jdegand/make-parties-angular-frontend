import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpFormComponent } from './rsvp-form.component';
import { RsvpService } from '../service/rsvp-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RsvpFormComponent', () => {
  let component: RsvpFormComponent;
  let fixture: ComponentFixture<RsvpFormComponent>;
  let rsvpServiceMock: any;
  let rsvpService: RsvpService
  let routerMock: any;
  
  // need fix and add a name property as well
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
      imports: [RsvpFormComponent, NoopAnimationsModule],
      providers: [
        {
          provide: RsvpService,
          useValue: rsvpServiceMock
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
    fixture = TestBed.createComponent(RsvpFormComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
