import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DiaryHttpService } from './diary-http.service';
import { DiaryRecord } from './diary-record';

@Injectable({
  providedIn: 'root',
})
export class DiaryService {
  diaryRecordsChanged = new BehaviorSubject<DiaryRecord[]>([]);
  private diaryRecords: DiaryRecord[] = [];

  constructor(private diaryHttp: DiaryHttpService) {
    this.diaryRecordsChanged.next(this.getRecords());
  }

  public getRecords() {
    return this.diaryRecords.slice();
  }

  public addRecord(record: DiaryRecord) {
    this.diaryHttp.insertRecord(record);
    this.diaryRecords.push(record);
    this.diaryRecordsChanged.next(this.getRecords());
  }
}
