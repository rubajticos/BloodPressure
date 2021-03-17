import { Component, OnInit } from '@angular/core';
import { DiaryRecord } from '../diary-record';
import { DiaryService } from '../diary.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  diaryRecords: DiaryRecord[] = [];

  constructor(private diaryService: DiaryService) { }

  ngOnInit(): void {

    this.diaryService.diaryRecordsChanged.subscribe(records => {
      this.diaryRecords = records.sort((a, b) => b.measureDate.getTime() - a.measureDate.getTime());
    })
  }

}
