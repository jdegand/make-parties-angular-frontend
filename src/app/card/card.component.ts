import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EventObj } from '../interfaces/EventObj';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() eventInfo: EventObj | undefined;

  @Input() last: boolean | undefined;

  /*
  ngOnInit(){
    console.log(this.eventInfo);
    console.log(typeof this.eventInfo);
  }
  */

}
