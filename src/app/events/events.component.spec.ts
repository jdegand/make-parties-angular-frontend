import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsComponent } from './events.component';
import { EventsService } from '../service/events-service.service';
import { of, throwError } from 'rxjs';
import { CardComponent } from '../card/card.component';
import { By } from '@angular/platform-browser';

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;
  let mockEventsService: any;
  let EVENTS: any;

  beforeEach(() => {

    EVENTS = [{
      "eventId": '1',
      "title": "BBQ",
      "desc": "Ribs!!!",
      "imgUrl": "https://picsum.photos/200/200",
      "takesPlaceOn": new Date("2023-09-09"),
    }, {
      "eventId": '2',
      "title": "Camping",
      "desc": "Roughing it",
      "imgUrl": "https://picsum.photos/200/200",
      "takesPlaceOn": new Date("2023-10-10"),
    }];

    mockEventsService = jasmine.createSpyObj(['getEvents']);

    TestBed.configureTestingModule({
      imports: [EventsComponent, CardComponent],
      providers: [{
        provide: EventsService,
        useValue: mockEventsService
      }]
    });
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges(); have to comment out here 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getEvents()', () => {
    mockEventsService.getEvents.and.returnValue(of(EVENTS));
    //ngOnInit()
    fixture.detectChanges();
    const cardComponents = fixture.debugElement.queryAll(
      By.directive(CardComponent)
    );

    expect(cardComponents.length).toEqual(EVENTS.length);
  });

  it('getEvents() with error', () => {
    mockEventsService.getEvents.and.returnValue(throwError(() => new Error()));
    //ngOnInit()
    fixture.detectChanges();
    
    const error = fixture.nativeElement.querySelector('h3');

    expect(error.textContent).toEqual('No Events Found');
  });

});
