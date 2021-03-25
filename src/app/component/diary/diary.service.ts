import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DiaryRecord } from './diary-record';

@Injectable({
  providedIn: 'root',
})
export class DiaryService {
  diaryRecordsChanged = new BehaviorSubject<DiaryRecord[]>([]);
  private diaryRecords: DiaryRecord[] = [];

  constructor() {
    this.diaryRecordsChanged.next(this.getRecords());
  }

  public getRecords() {
    return this.diaryRecords.slice();
  }

  public addRecord(record: DiaryRecord) {
    this.diaryRecords.push(record);
    this.diaryRecordsChanged.next(this.getRecords());
  }
}
