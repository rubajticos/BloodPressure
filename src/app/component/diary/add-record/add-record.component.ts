import { Component, OnInit } from '@angular/core';
import { DiaryService } from '../diary.service';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.sass'],
})
export class AddRecordComponent implements OnInit {
  constructor(private diaryService: DiaryService) {}

  ngOnInit(): void {
    this.diaryService;
  }
}
