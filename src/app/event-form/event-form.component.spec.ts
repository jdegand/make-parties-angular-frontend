import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { EventFormComponent } from './event-form.component';
import { EventsService } from '../service/events-service.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

describe('EventFormComponent', () => {
  let component: EventFormComponent;
  let fixture: ComponentFixture<EventFormComponent>;
  let el: DebugElement;

  // included animations with angular material although I didn't use any 
  // Now need to include animations module to get tests to run

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EventFormComponent, ReactiveFormsModule, HttpClientModule, NoopAnimationsModule],
      providers: [HttpClient,
        {
          provide: EventsService
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

  it('cancel()', ()=> {
    const spyformReset = spyOn(component.eventInfo, 'reset').and.callThrough();
    component.cancel();
    expect(spyformReset).toHaveBeenCalled();
  });

});
