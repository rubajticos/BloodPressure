import { Component, Input, OnInit } from '@angular/core';
import { DiaryRecord } from '../diary-record';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  @Input() record: DiaryRecord;

  constructor() { }

  ngOnInit(): void {
  }

}
