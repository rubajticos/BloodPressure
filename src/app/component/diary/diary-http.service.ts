import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DiaryRecord } from './diary-record';

@Injectable({
  providedIn: 'root',
})
export class DiaryHttpService {
  constructor(private http: HttpClient) {}

  insertRecord(record: DiaryRecord) {
    this.http
      .post(environment.baseUrl, record)
      .subscribe((res) => console.log(res));
  }
}
