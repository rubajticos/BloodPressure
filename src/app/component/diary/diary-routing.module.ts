import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiaryComponent } from './diary/diary.component';
import { RecordsComponent } from './records/records.component';

const routes: Routes = [{ path: '', component: DiaryComponent, children: [
  {path: '', component: RecordsComponent}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class DiaryRoutingModule {}
