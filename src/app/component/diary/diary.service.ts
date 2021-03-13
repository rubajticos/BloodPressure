import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DiaryRecord } from './diary-record';

@Injectable({
  providedIn: 'root',
})
export class DiaryService {
  private defaultRecords = [
    new DiaryRecord(120, 80, 60, "Fusce in semper dui.", new Date()),
    new DiaryRecord(145, 65, 45, "Quisque posuere eu mauris at aliquam.", new Date()),
    new DiaryRecord(200, 98, 78, "Fusce posuere pellentesque nulla vitae hendrerit.", new Date()),
    new DiaryRecord(160, 120, 100, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis nunc dignissim, sodales risus id, ornare magna. Vivamus aliquam vel est non hendrerit. Nulla bibendum, massa in vestibulum facilisis, felis tortor placerat lectus, id lacinia risus metus sit amet felis. Proin sit amet nisl tristique, hendrerit arcu in, volutpat ipsum. Aenean ac fermentum lectus, a commodo nisi. ", new Date()),
  ]

  diaryRecordsChanged = new BehaviorSubject<DiaryRecord[]>([]);
  private diaryRecords: DiaryRecord[] = this.defaultRecords;

  constructor() {
    this.diaryRecordsChanged.next(this.getRecords());
  }

  public getRecords() {
    return this.diaryRecords.slice().sort((a, b) => b.measureDate.getTime() - a.measureDate.getTime())
  }

  public addRecord(record: DiaryRecord) {
    this.diaryRecords.push(record);
    this.diaryRecordsChanged.next(this.getRecords());
  }
}
