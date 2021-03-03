import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
      top: new FormControl(null, Validators.required),
      bottom: new FormControl(null, Validators.required),
      pulse: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      note: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.diaryService;
  }

  onSubmit() {
    console.log('newRecordForm submit');
    console.log(this.newRecordForm.value);
  }
}
