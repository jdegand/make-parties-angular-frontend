import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { EventFormComponent } from './event-form.component';
import { EventsService } from '../service/events-service.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('EventFormComponent', () => {
  let component: EventFormComponent;
  let fixture: ComponentFixture<EventFormComponent>;
  let el: DebugElement;
  let mockEventsService = jasmine.createSpyObj('EventsService', ['postEvent']);

  // included animations with angular material although I didn't use any 
  // Now I need to include animations module to get tests to run

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EventFormComponent, ReactiveFormsModule, HttpClientModule, NoopAnimationsModule],
      providers: [HttpClient,
        {
          provide: EventsService,
          useValue: mockEventsService
        }
      ]
    });
    fixture = TestBed.createComponent(EventFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('maxLength title', () => {
    component.eventInfo.setValue({
      "title": "pneumonoultramicroscopicsilicovolcanoconiosis",
      "desc": "too long",
      "imgUrl": "",
      "takesPlaceOn": ""
    });

    expect(component.eventInfo.valid).toEqual(false);
  });

  it('takePlaceOn required', () => {
    component.eventInfo.setValue({
      "title": "pneumonoultra",
      "desc": "",
      "imgUrl": "",
      "takesPlaceOn": null
    });

    expect(component.eventInfo.valid).toEqual(false);
  });

  it('form value is valid', () => {
    component.eventInfo.setValue({
      "title": "pneumonoultra",
      "desc": "",
      "imgUrl": "",
      "takesPlaceOn": "2023-09-09"
    });

    expect(component.eventInfo.valid).toEqual(true);
  });

  it('submit button is disabled initially', ()=> {
    let submitBtn = el.nativeElement.querySelector('button[type="submit"]');

    expect(submitBtn.disabled).toBe(true);
  })

  it('submit button changes to enabled', ()=> {

    component.eventInfo.setValue({
      "title": "pneumonoultra",
      "desc": "",
      "imgUrl": "",
      "takesPlaceOn": "2023-07-31"
    });

    fixture.detectChanges();

    let submitBtn = el.nativeElement.querySelector('button[type="submit"]');

    expect(submitBtn.disabled).toBe(false);
  })

  it('submit()', ()=> {

    // need to check return values of real post to make sure all properties are added to mock
    let mockPost = {
      "eventId": "1",
      "title": "pneumonoultra",
      "desc": "",
      "imgUrl": "",
      "takesPlaceOn": "2023-07-31"
    }

    component.eventInfo.setValue({
      "title": "pneumonoultra",
      "desc": "",
      "imgUrl": "",
      "takesPlaceOn": "2023-07-31"
    });

    mockEventsService.postEvent.and.returnValue(of(mockPost));

    component.submit();

    fixture.detectChanges();

    expect(mockEventsService.postEvent).toHaveBeenCalled();
  })

  it('submit() error', ()=> {

    component.eventInfo.setValue({
      "title": "pneumonoultra",
      "desc": "",
      "imgUrl": "",
      "takesPlaceOn": "2023-07-31"
    });

    mockEventsService.postEvent.and.returnValue(throwError(() => new Error()));

    component.submit();

    fixture.detectChanges();

    expect(mockEventsService.postEvent).toHaveBeenCalled();
  })

  it('cancel()', ()=> {
    const spyformReset = spyOn(component.eventInfo, 'reset').and.callThrough();
    component.cancel();
    expect(spyformReset).toHaveBeenCalled();
  });

});
