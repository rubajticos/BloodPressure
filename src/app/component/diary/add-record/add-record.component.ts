import { not } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DiaryRecord } from '../diary-record';
import { DiaryService } from '../diary.service';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.scss'],
})
export class AddRecordComponent implements OnInit {
  @Output() hideMe = new EventEmitter<boolean>();
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
      measureDate: new FormControl(null, Validators.required),
      note: new FormControl(null, Validators.maxLength(200)),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const top = this.newRecordForm.controls["top"].value;
    const bottom = this.newRecordForm.controls["bottom"].value;
    const pulse = this.newRecordForm.controls["pulse"].value;
    const note = this.newRecordForm.controls["note"].value;
    const date = new Date(this.newRecordForm.controls["measureDate"].value);

    const newRecord = new DiaryRecord(top, bottom, pulse, note, date);
    this.diaryService.addRecord(newRecord);
    this.newRecordForm.reset();
    this.hideMe.emit(true);
  }
}
