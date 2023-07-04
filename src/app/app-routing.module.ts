import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { EventsComponent } from './events/events.component';
import { EventFormComponent } from './event-form/event-form.component';
import { RsvpFormComponent } from './rsvp-form/rsvp-form.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { UpdateEventFormComponent } from './update-event-form/update-event-form.component';

const routes: Routes = [
  {path: "event/:eventId/edit", component: UpdateEventFormComponent},
  {path: "event/:eventId/details", component: EventDetailComponent},
  {path: "events/:eventId/:eventName/rsvp", component: RsvpFormComponent},
  {path: "events/new", component: EventFormComponent},
  {path:"", component: EventsComponent},
  {path:"**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
