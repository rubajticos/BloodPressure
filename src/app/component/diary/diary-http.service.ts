import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { DiaryRecord } from './diary-record';

@Injectable({
  providedIn: 'root',
})
export class DiaryHttpService {
  private userDiaryUrl: string;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.auth.user.then((user) => {
      if (user !== null) {
        this.userDiaryUrl =
          environment.baseUrl + '/diary/' + user.uid + '.json';
        console.log(this.userDiaryUrl);
      }
    });
  }

  insertRecord(record: DiaryRecord) {
    if (this.userDiaryUrl) {
      this.http
        .post(this.userDiaryUrl, record)
        .subscribe((res) => console.log(res));
    }
  }
}
