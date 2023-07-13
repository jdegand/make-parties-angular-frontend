import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EventsService } from '../service/events-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './update-event-form.component.html',
  styleUrls: ['./update-event-form.component.css']
})
export class UpdateEventFormComponent {

  constructor(private builder: FormBuilder, private route:ActivatedRoute, private eventsService: EventsService, private router:Router){}

  eventId: String | undefined | null;

  previousEventInfo: any = undefined;

  minDate = new Date(new Date().getTime()).toISOString().substring(0, 10);

  async ngOnInit(){
    this.eventId = this.route.snapshot.paramMap.get("eventId");

    // make api request & set previousEventInfo - use previousEventInfo.title for initial value in builder group

    if(this.eventId !==  null){
      await this.getEvent(this.eventId);
      //console.log(this.previousEventInfo);
    }
  }

  updatedEventInfo = this.builder.group({
    title: this.builder.control('', [Validators.required]),
    desc: this.builder.control(''),
    imgUrl: this.builder.control(''),
    takesPlaceOn: this.builder.control(''),
  })

  async getEvent(eventId: String) {
    //return this.eventsService.getEventById(eventId).subscribe(data => this.event = data);

    return this.eventsService.getEventById(eventId).subscribe(
      {
        next: (data) => {
          this.previousEventInfo = data;

          this.updatedEventInfo.patchValue({
            title: this.previousEventInfo.title,
            desc: this.previousEventInfo.desc,
            imgUrl: this.previousEventInfo.imgUrl,
            takesPlaceOn: this.previousEventInfo.takesPlaceOn
          })
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      }
    );

  }

  submit(){
    //console.log(this.updatedEventInfo);

    if(this.eventId && this.updatedEventInfo.valid){
      this.eventsService.updateEvent(this.eventId, this.updatedEventInfo.value).subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => {
          console.info('complete');
          this.router.navigate(["/"]); 
        }
      });
    }

  }

  cancel(){
    this.updatedEventInfo.reset();
  }

}
