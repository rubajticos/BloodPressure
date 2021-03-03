import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DiaryRecord } from '../diary-record';
import { DiaryService } from '../diary.service';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.sass'],
})
export class AddRecordComponent implements OnInit {
  newRecordForm: FormGroup;

  constructor(private diaryService: DiaryService) {
    this.newRecordForm = new FormGroup({
      top: new FormControl(null, [
        Validators.required,
        Validators.max(300),
        Validators.min(1),
      ]),
      bottom: new FormControl(null, [
        Validators.required,
        Validators.max(300),
        Validators.min(1),
      ]),
      pulse: new FormControl(null, [
        Validators.required,
        Validators.max(250),
        Validators.min(1),
      ]),
      date: new FormControl(null, Validators.required),
      note: new FormControl(null, Validators.maxLength(200)),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.diaryService.addRecord(this.newRecordForm.value);
  }
}
