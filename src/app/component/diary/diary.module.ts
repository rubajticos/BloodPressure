import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordsComponent } from './records/records.component';
import { AddRecordComponent } from './add-record/add-record.component';
import { DiaryComponent } from './diary/diary.component';

@NgModule({
  declarations: [DiaryComponent, AddRecordComponent, RecordsComponent],
  imports: [CommonModule],
})
export class DiaryModule {}
