import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiaryComponent } from './component/diary/diary/diary.component';

const routes: Routes = [{ path: '', component: DiaryComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
