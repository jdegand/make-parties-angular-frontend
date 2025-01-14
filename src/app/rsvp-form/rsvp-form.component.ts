import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { RsvpService } from '../service/rsvp-service.service';

@Component({
  selector: 'app-rsvp-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './rsvp-form.component.html',
  styleUrls: ['./rsvp-form.component.css']
})
export class RsvpFormComponent {

  constructor(private builder: FormBuilder, private route: ActivatedRoute, private rsvpService: RsvpService, private router: Router) { }

  eventName: string | undefined | null;
  eventId: string | undefined | null;

  ngOnInit() {
    this.eventName = this.route.snapshot.paramMap.get("eventName");
    this.eventId = this.route.snapshot.paramMap.get("eventId");
  }

  rsvpInfo = this.builder.group({
    name: this.builder.control('', [Validators.required]),
    email: this.builder.control(''),
  })

  submit() {
    if (this.rsvpInfo.valid) {
      // could add a snackbar message(s) below 
      this.rsvpService.postRsvp(this.eventId, this.rsvpInfo.value).subscribe({
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
    this.rsvpInfo.reset();
  }
}
