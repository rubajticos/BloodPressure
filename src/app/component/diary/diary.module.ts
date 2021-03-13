import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordsComponent } from './records/records.component';
import { AddRecordComponent } from './add-record/add-record.component';
import { DiaryComponent } from './diary/diary.component';
import { DiaryRoutingModule } from './diary-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecordComponent } from './record/record.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [DiaryComponent, AddRecordComponent, RecordsComponent, RecordComponent, ChartComponent],
  imports: [CommonModule, DiaryRoutingModule, ReactiveFormsModule, RouterModule],
  exports: [DiaryComponent, AddRecordComponent, RecordsComponent],
})
export class DiaryModule {}
