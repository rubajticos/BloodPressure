import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DiaryRecord } from './diary-record';

@Injectable({
  providedIn: 'root',
})
export class DiaryHttpService {
  private diaryUrl = environment.baseUrl + '/diary.json';

  constructor(private http: HttpClient) {}

  insertRecord(record: DiaryRecord) {
    this.http.post(this.diaryUrl, record).subscribe((res) => console.log(res));
  }
}
