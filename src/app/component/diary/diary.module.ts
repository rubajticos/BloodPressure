import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordsComponent } from './records/records.component';
import { AddRecordComponent } from './add-record/add-record.component';
import { DiaryComponent } from './diary/diary.component';
import { DiaryRoutingModule } from './diary-routing.module';

@NgModule({
  declarations: [DiaryComponent, AddRecordComponent, RecordsComponent],
  imports: [CommonModule, DiaryRoutingModule],
  exports: [DiaryComponent, AddRecordComponent, RecordsComponent],
})
export class DiaryModule {}
