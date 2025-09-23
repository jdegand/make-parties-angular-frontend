import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EventsService } from '../service/events-service.service';
import { Router } from '@angular/router';
import { EventObj } from '../interfaces/EventObj';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {

  constructor(private readonly builder: FormBuilder, private readonly eventsService: EventsService, private readonly router: Router) { }

  minDate = new Date(new Date().getTime()).toISOString().substring(0, 10);

  eventInfo = this.builder.group({
    title: this.builder.control('', [Validators.required, Validators.max(40)]),
    desc: this.builder.control(''),
    imgUrl: this.builder.control(''),
    takesPlaceOn: this.builder.control('', [Validators.required]) // need custom validator for minDate?
  })

  submit() {
    if (this.eventInfo.valid) {
      this.eventsService.postEvent(this.eventInfo.value as Partial<EventObj>).subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => {
          console.info('complete');
          this.router.navigate(["/"]);
        }
      })

    }
  }

  cancel() {
    this.eventInfo.reset();
  }

}
