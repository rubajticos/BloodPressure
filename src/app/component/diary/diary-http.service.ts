import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DiaryRecord } from './diary-record';

@Injectable({
  providedIn: 'root',
})
export class DiaryHttpService {
  constructor(private http: HttpClient) {}

  insertRecord(record: DiaryRecord) {}
}
