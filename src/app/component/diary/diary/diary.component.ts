import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss'],
  animations: [
    trigger('showRecordForm', [
      state('show', style({opacity: 1, display: 'block'})),
      state('hide', style({opacity: 0, display: 'none'})),
      transition('show => hide', animate('1000ms', keyframes([
        style({opacity: 0.8}),
        style({opacity: 0.5}),
        style({opacity: 0.3}),
        style({opacity: 0})
      ]))),
      transition('hide => show', animate('1000ms', keyframes([
        style({display: 'block'}),
        style({opacity: 0.3}),
        style({opacity: 0.5}),
        style({opacity: 0.8}),
        style({opacity: 1})
      ])))
    ])
]
})
export class DiaryComponent implements OnInit {
  newRecordFormVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleNewRecordForm() {
    this.newRecordFormVisible = !this.newRecordFormVisible;
  }

  get formStateName() {
    return this.newRecordFormVisible ? 'show' : 'hide';
  }

  get addNewText() {
    if(this.newRecordFormVisible) {
      return 'Ukryj'
    } else {
      return 'Dodaj nowy wpis'
    }
  }

}
